﻿/// <reference path='typings/jquery/jquery.d.ts' />
/// <reference path='typings/jqueryui/jqueryui.d.ts' />
var JMSLib;
(function (JMSLib) {
    // Alle CSS Klassen, die vom Code aus gesetzt werden
    var CSSClass = (function () {
        function CSSClass() {
        }
        CSSClass.invalid = 'invalid';

        CSSClass.invisible = 'invisible';

        CSSClass.warning = 'warning';

        CSSClass.inlineHelp = 'inlineHelp';

        CSSClass.hourSetting = 'hourChecker';

        CSSClass.detailView = 'detailView';
        return CSSClass;
    })();
    JMSLib.CSSClass = CSSClass;

    // Wertet eine Fehlermeldung von einem Web Dienst aus
    function dispatchErrorMessage(onError) {
        return function (result) {
            var info = $.parseJSON(result.responseText);

            onError(info.ExceptionMessage);
        };
    }
    JMSLib.dispatchErrorMessage = dispatchErrorMessage;

    // Bereitet die Anzeige der Hilfe vor
    function activateHelp() {
        $('.' + CSSClass.inlineHelp).accordion({
            heightStyle: 'content',
            collapsible: true,
            animate: false,
            active: false
        });
    }
    JMSLib.activateHelp = activateHelp;

    // Verwaltet Vorlagen
    var TemplateLoader = (function () {
        function TemplateLoader() {
        }
        TemplateLoader.load = // Lädt eine Vorlage asynchron
        function (templateName) {
            return TemplateLoader.loadAbsolute(TemplateLoader.templateRoot + templateName + '.html');
        };

        TemplateLoader.loadAbsolute = // Lädt eine Vorlage asynchron
        function (fullName) {
            var template = TemplateLoader.loaded[fullName];

            if (template == undefined)
                return $.get(fullName).done(function (html) {
                    TemplateLoader.loaded[fullName] = html;
                });

            return $.Deferred().resolve(template);
        };
        TemplateLoader.templateRoot = 'ui/templates/';

        TemplateLoader.loaded = {};
        return TemplateLoader;
    })();
    JMSLib.TemplateLoader = TemplateLoader;

    // Hilfsklasse zur Bindung von Formulareigenschaften an Modelldaten
    var Bindings = (function () {
        function Bindings() {
        }
        Bindings.bind = // Führt die Bindung einer prüfbaren Klasse an ein Oberflächenelement aus.
        function (validator, form) {
            // Die prüfbare Klasse weiß zu jeder Zeit, mit welche Oberflächenelement das Modell als Ganzes verbunden ist
            validator.view = form;

            var model = validator.model;

            // Alle Oberflächenelement über data-property an Eigenschaften des Modells binden
            form.find('[' + Bindings.propertyAttribute + ']').each(function (index, element) {
                var targetProperty = element.getAttribute(Bindings.propertyAttribute);
                var target = $(element);

                // Mal sehen, ob wir das an ein anderes Element übergeben wollen
                var targetSelector = element.getAttribute(HTMLTemplate.targetAttribute);
                if (targetSelector != null)
                    target = target.find(targetSelector);

                // Auf Eingaben reagieren - die Übernahme in das Modell erfolgt abhängig von der Art des Oberflächenelementes
                function propertyChanged() {
                    if (target.is(':checkbox'))
                        model[targetProperty] = target.prop('checked');
else if (target.data('datepicker') != undefined)
                        model[targetProperty] = target.datepicker('getDate');
else
                        model[targetProperty] = target.val();

                    Bindings.validate(validator);
                }

                // Alle Änderungen am Oberflächenelement überwachen
                target.on('input', propertyChanged);
                target.on('change', propertyChanged);
            });

            // Daten einmalig aus dem Modell in die Oberfläche übertragen und dann alles prüfen
            Bindings.fromModelToForm(model, form);
            Bindings.validate(validator);
        };

        Bindings.setErrorIndicator = // Markiert ein Oberflächenelement als Fehleingabe und setzt die Fehlermeldung als Tooltip
        function (target, message) {
            var element = target[0];

            if (message == null) {
                element.removeAttribute('title');
                target.removeClass(CSSClass.invalid);
            } else {
                element.setAttribute('title', message);
                target.addClass(CSSClass.invalid);
            }
        };

        Bindings.validate = // Führt alle Prüfungen auf einer prüfbaren Klasse aus.
        function (validator) {
            validator.validate();

            Bindings.synchronizeErrors(validator);
        };

        Bindings.synchronizeErrors = // Aktualisiert die Darstellung der Fehlermeldungen
        function (validator) {
            // Über die Namenskonvention die Fehlermeldungen aus der prüfbaren Klasse auslesen - nicht die tatsächlichen Werte aus den Modelleigenschaften!
            validator.view.find('[' + Bindings.propertyAttribute + ']').each(function (index, element) {
                var targetProperty = element.getAttribute(Bindings.propertyAttribute);
                var errorMessage = validator[targetProperty];

                if (errorMessage === undefined)
                    return;

                // In seltenen Fällen wollen die Fehlermeldung an einem anderen Oberflächenelement anzeigen als das, in dem der Anwender die Eingabe tätigt
                var target = $(element);
                var errorProperty = element.getAttribute(Bindings.validationAttribute);
                if (errorProperty != null)
                    target = validator.view.find(errorProperty);

                Bindings.setErrorIndicator(target, errorMessage);
            });
        };

        Bindings.fromModelToForm = // Alle Daten aus dem Modell in die Oberflächenelemente übertragen.
        function (model, form) {
            form.find('[' + Bindings.propertyAttribute + ']').each(function (index, element) {
                var targetProperty = element.getAttribute(Bindings.propertyAttribute);
                var data = model[targetProperty];
                var target = $(element);

                // Mal sehen, ob wir das an ein anderes Element übergeben wollen
                var targetSelector = element.getAttribute(HTMLTemplate.targetAttribute);
                if (targetSelector != null)
                    target = target.find(targetSelector);

                if (target.is(':checkbox')) {
                    target.prop('checked', data);
                } else if (target.data('datepicker') != undefined) {
                    target.datepicker('setDate', data);

                    model[targetProperty] = target.datepicker('getDate');
                } else {
                    target.val(data);

                    if (element.nodeName == 'SPAN')
                        target.text(data);
else
                        model[targetProperty] = target.val();
                }
            });
        };

        Bindings.checkNumber = // Prüft, ob eine Zahl in einem bestimmten Wertebereich liegt und meldet bei Bedarf einen Fehlertext.
        function (input, min, max) {
            if (!Bindings.numberPattern.test(input))
                return 'Keine gültige Zahl';

            var num = parseInt(input);
            if (num < min)
                return 'Der minimal erlaubte Wert ist ' + min;
            if (num > max)
                return 'Der maximal erlaubte Wert ist ' + max;

            return null;
        };
        Bindings.propertyAttribute = 'data-property';

        Bindings.validationAttribute = 'data-validation-target';

        Bindings.numberPattern = /^\d+$/;
        return Bindings;
    })();
    JMSLib.Bindings = Bindings;

    // Verwaltet ein unsichtbares HTML Element als Vorlage für eine Zeile in einer Liste
    var HTMLTemplate = (function () {
        function HTMLTemplate(list, templateName) {
            // Der Filter ist für alle Elemente gesetzt, die angezeigt werden sollen
            this.filter = function (item) {
                return true;
            };
            // Die zu verwendende Vorlage
            this.template = null;
            var me = this;
            me.list = list;

            // Laden anstossen
            TemplateLoader.load(templateName).done(function (template) {
                me.template = $(template).find('#template');
                me.refresh();
            });
        }
        // Baut die Darstellung gemäß der aktuellen Filterbedingung neu auf
        HTMLTemplate.prototype.refresh = function () {
            var me = this;

            if (me.template == null)
                return;
            if (me.items == undefined)
                return;

            // Aktuelle Liste vollständig löschen
            me.list.children().remove();

            // Muster für jedes einzelne Listenelement erzeugen
            me.items.forEach(function (item, index) {
                if (me.filter(item))
                    HTMLTemplate.cloneAndApplyTemplate(item, me.template).appendTo(me.list);
            });
        };

        HTMLTemplate.retrieveProperty = // Ermittelt eine Eigenschaft gemäß dem Wert von data-property.
        function (data, propertyPath) {
            // Zerlegen um auf Subobjektreferenzen zu prüfen
            var parts = propertyPath.split('.');

            for (var i = 0; i < parts.length; i++) {
                if (data == null)
                    return null;

                // Schauen wir mal, ob ein Methodenaufruf gemacht werden soll.
                var name = parts[i];
                var coreLength = name.length - 2;
                var isCall = (coreLength > 0) && (name.substr(coreLength) == '()');

                if (isCall)
                    data = data[name.substr(0, coreLength)]();
else
                    data = data[name];
            }

            // Aktuelles Ergebnis melden
            return data;
        };

        HTMLTemplate.applyTemplate = // Ersetzt alle Platzhalter in einem Oberflächenmodell und schaltet dieses dann sichtbar.
        function (model, element) {
            // Platzhalter zum Ersetzen durch Werte
            element.find('[' + Bindings.propertyAttribute + ']').each(function (index, element) {
                // Rohdaten auslesen
                var dataProperty = element.getAttribute(Bindings.propertyAttribute);
                var dataValue = HTMLTemplate.retrieveProperty(model, dataProperty);

                if (dataValue == null)
                    if (element.getAttribute(HTMLTemplate.requiredAttribute)) {
                        element.parentNode.removeChild(element);
                        return;
                    }

                // Auf Wunsch Rohdaten formatieren
                var dataFormat = element.getAttribute(HTMLTemplate.formatAttribute);
                if (dataFormat != null)
                    if (dataValue != null)
                        dataValue = dataFormat.replace(HTMLTemplate.valuePlaceholder, dataValue);

                // Zielelement ermitteln
                var target = $(element);
                var targetLookup = element.getAttribute(HTMLTemplate.targetAttribute);
                if (targetLookup != null)
                    target = target.find(targetLookup);

                // Attribut des Zielelementes ermitteln und formatierten oder unformatierten Wert einsetzen
                var attributeTarget = element.getAttribute(HTMLTemplate.targetAttributeAttribute);
                if (attributeTarget == null)
                    if (target.is(':checkbox')) {
                        target.prop('checked', dataValue);

                        if (element.getAttribute(HTMLTemplate.writebackAttribute) != null)
                            target.change(function () {
                                model[dataProperty] = target.prop('checked');
                            });
                    } else
                        target.text(dataValue);
else
                    target.attr(attributeTarget, dataValue);
            });

            // Platzhalter für Prüfergebnisse
            element.find('[' + HTMLTemplate.validationResultAttribute + ']').each(function (index, element) {
                var target = $(element);
                var validationPath = element.getAttribute(HTMLTemplate.validationResultAttribute);
                if (HTMLTemplate.retrieveProperty(model, validationPath))
                    target.removeClass(CSSClass.warning);
else
                    target.addClass(CSSClass.warning);
            });

            // Platzhalte für Raktion auf das Betätigen von Verweisen
            element.find('[' + HTMLTemplate.clickAttribute + ']').each(function (index, elem) {
                var dataProperty = elem.getAttribute(HTMLTemplate.clickAttribute);
                var dataValue = model[dataProperty];

                $(elem).on('click', dataValue);
            });

            // Erst anzeigen, nachdem alles ersetzt wurde
            element.removeClass(CSSClass.invisible);
        };

        HTMLTemplate.cloneAndApplyTemplate = // Erzeugt eine Kopie einer Vorlage und erstzt dann in dieser Kopie alle Platzhalter.
        function (model, element) {
            // Kopie erstellen
            element = element.clone();

            // Platzhalter anwenden
            HTMLTemplate.applyTemplate(model, element);

            // Kopie melden
            return element;
        };

        // Ersetzt die darzustellenden Daten.
        HTMLTemplate.prototype.loadList = function (items) {
            this.items = items;
            this.refresh();
        };
        HTMLTemplate.requiredAttribute = 'data-property-required';

        HTMLTemplate.formatAttribute = 'data-format';

        HTMLTemplate.valuePlaceholder = '##value##';

        HTMLTemplate.targetAttribute = 'data-target';

        HTMLTemplate.targetAttributeAttribute = 'data-attribute';

        HTMLTemplate.writebackAttribute = 'data-writeback';

        HTMLTemplate.validationResultAttribute = 'data-validation-result';

        HTMLTemplate.clickAttribute = 'data-clickevent';
        return HTMLTemplate;
    })();
    JMSLib.HTMLTemplate = HTMLTemplate;

    // Verwaltet in einer Tabellendarstellung die Möglichkeit, Details aufzuklappen.
    var DetailManager = (function () {
        function DetailManager(nodesUp) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                args[_i] = arguments[_i + 1];
            }
            // Das aktuell angezeigte Oberflächenelement
            this.activeNode = null;
            // Die laufende Nummer der gerade angezeigten Vorlage
            this.activeTemplate = -1;
            var templates = new Array();

            $.each(args, function (index, template) {
                TemplateLoader.load(template).done(function (template) {
                    templates[index] = $(template).find('#template');
                });
            });

            this.nodesToMoveUp = nodesUp;
            this.templates = templates;
        }
        // Setzt die Verwaltung auf den Grundzustand zurück
        DetailManager.prototype.reset = function () {
            this.activeNode = null;
        };

        // Blendet eine neue Detailansicht ein oder eine existierende aus
        DetailManager.prototype.toggle = function (item, origin, templateIndex) {
            // Noch nicht geladen - schade
            var template = this.templates[templateIndex];
            if (template == undefined)
                return null;

            // Auslösepunkt ermitteln und daraus den Bezugspunkt bestimmen
            var row = origin;
            for (var i = this.nodesToMoveUp; i-- > 0;)
                row = row.parentNode;

            // Schauen wir mal, ob wir gerade ein Detail anzeigen
            var active = this.activeNode;
            if (active != null) {
                active.parentNode.removeChild(active.nextSibling);

                if (this.activeTemplate == templateIndex)
                    if (active === row) {
                        this.activeNode = null;

                        // Fertig
                        return null;
                    }
            }

            // Aktualisieren
            this.activeTemplate = templateIndex;
            this.activeNode = row;

            // Neues Oberflächenelement aus der Vorlage erzeugen, befüllen und anzeigen
            var newElement = HTMLTemplate.cloneAndApplyTemplate(item, template);
            newElement.addClass(CSSClass.detailView);
            newElement.removeAttr('id');
            newElement.insertAfter(row);

            return newElement;
        };
        return DetailManager;
    })();
    JMSLib.DetailManager = DetailManager;

    // Formatiert Datum und Uhrzeit
    var DateFormatter = (function () {
        function DateFormatter() {
        }
        DateFormatter.formatNumber = // Stellt sicher, dass eine Zahl immer zweistellig ist
        function (num) {
            var asString = num.toString();
            if (asString.length > 1)
                return asString;
else
                return '0' + asString;
        };

        DateFormatter.getEndTime = // Ermittelt die Uhrzeit
        function (end) {
            return DateFormatter.formatNumber(end.getHours()) + ':' + DateFormatter.formatNumber(end.getMinutes());
        };

        DateFormatter.getDuration = // Ermittelt eine Dauer in Minuten und stellt diese als Uhrzeit dar
        function (duration) {
            return DateFormatter.formatNumber(duration.getUTCHours()) + ':' + DateFormatter.formatNumber(duration.getUTCMinutes());
        };

        DateFormatter.getStartDate = // Ermittelt ein Datum
        function (start) {
            return DateFormatter.getShortDate(start) + '.' + start.getFullYear().toString();
        };

        DateFormatter.getShortDate = // Ermittelt ein Datum ohne Jahresangabe
        function (start) {
            return DateFormatter.germanDays[start.getDay()] + ' ' + DateFormatter.formatNumber(start.getDate()) + '.' + DateFormatter.formatNumber(1 + start.getMonth());
        };

        DateFormatter.getStartTime = // Ermittelt einen Startzeitpunkt
        function (start) {
            var time = DateFormatter.formatNumber(start.getHours()) + ':' + DateFormatter.formatNumber(start.getMinutes());

            return DateFormatter.getStartDate(start) + ' ' + time;
        };

        DateFormatter.parseTime = // Prüft eine Eingabe auf eine gültige Uhrzeit (H:M, jeweils ein oder zweistellig)
        function (time) {
            var parts = time.split(':');
            if (parts.length != 2)
                return null;

            var hour = DateFormatter.parseHourMinute(parts[0]);
            if (hour == null)
                return null;
            if (hour > 23)
                return null;
            var minute = DateFormatter.parseHourMinute(parts[1]);
            if (minute == null)
                return null;
            if (minute > 59)
                return null;

            return (60 * hour + minute) * 60000;
        };

        DateFormatter.parseHourMinute = // Analyisiert eine Eingabe auf eine gültige, maximal zweistellige nicht negative Zahl
        function (hourMinute) {
            if (hourMinute.length == 1)
                hourMinute = '0' + hourMinute;
            if (hourMinute.length != 2)
                return null;

            var upper = DateFormatter.parseDigit(hourMinute.charCodeAt(0));
            if (upper == null)
                return null;
            var lower = DateFormatter.parseDigit(hourMinute.charCodeAt(1));
            if (lower == null)
                return null;

            return upper * 10 + lower;
        };

        DateFormatter.parseDigit = // Anlysiert die Eingabe einer Ziffer
        function (digit) {
            if (digit < 0x30)
                return null;
            if (digit > 0x39)
                return null;

            return digit - 0x30;
        };
        DateFormatter.germanDays = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
        return DateFormatter;
    })();
    JMSLib.DateFormatter = DateFormatter;

    // Verwaltung einer Auswahl von N aus 24 Stunden für die Aktualisierungen
    var HourListSettings = (function () {
        function HourListSettings() {
        }
        HourListSettings.decompress = // Zerlegt eine Liste von Zahlen in einzelne Markierungen
        function (settings, hours) {
            for (var i = 0; i < 24; i++)
                settings['hour' + DateFormatter.formatNumber(i)] = false;

            $.each(hours, function (index, hour) {
                if (hour >= 0)
                    if (hour <= 23)
                        settings['hour' + DateFormatter.formatNumber(hour)] = true;
            });
        };

        HourListSettings.compress = // Kombiniert Markierungen zu einer Liste
        function (settings) {
            var hours = new Array();
            for (var i = 0; i < 24; i++)
                if (settings['hour' + DateFormatter.formatNumber(i)])
                    hours.push(i);

            return hours;
        };

        HourListSettings.isHourFlag = // Prüft, ob ein bestimmter Name eine unserer Markierungseigenschaften ist
        function (name) {
            return (name.length == 6) && (name.substr(0, 4) == 'hour');
        };

        HourListSettings.createHourButtons = // Erstellt die Schaltflächen für die Auswahl der Uhrzeiten.
        function (hours, namePrefix) {
            for (var i = 0; i < 24; i++) {
                var fullHour = DateFormatter.formatNumber(i);
                var name = namePrefix + fullHour;
                var prop = 'hour' + fullHour;

                hours.append('<input id="' + name + '" type="checkbox" ' + Bindings.propertyAttribute + '="' + prop + '" class="' + CSSClass.hourSetting + '"/>');
                hours.append('<label for="' + name + '">' + fullHour + '</label>');
            }
        };
        return HourListSettings;
    })();
    JMSLib.HourListSettings = HourListSettings;
})(JMSLib || (JMSLib = {}));