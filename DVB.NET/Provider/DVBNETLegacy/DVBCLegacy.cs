﻿using System;

using JMS.DVB.DeviceAccess;
using JMS.DVB.DeviceAccess.Interfaces;


namespace JMS.DVB.Provider.Legacy
{
    /// <summary>
    /// Diese Klasse vermittelt den Zugriff auf eine vorhandene DVB.NET Abstraktion vor
    /// Version 3.5.1.
    /// </summary>
    public class DVBCLegacy : LegacyHardware<CableProfile, CableLocation, CableGroup>
    {
        /// <summary>
        /// Erzeugt eine neue Vermittlungsinstanz.
        /// </summary>
        /// <param name="profile">Das zugeordnete Geräteprofil.</param>
        public DVBCLegacy( CableProfile profile )
            : base( profile )
        {
        }

        /// <summary>
        /// Meldet die Art des DVB Empfangs.
        /// </summary>
        protected override DVBSystemType SystemType
        {
            get
            {
                // Report
                return DVBSystemType.Cable;
            }
        }

        /// <summary>
        /// Stellt den Empfang auf eine bestimmte Quellgruppe eines Ursprungs ein.
        /// </summary>
        /// <param name="location">Der gewünschte Ursprung.</param>
        /// <param name="group">Die gewünschte Quellgruppe.</param>
        protected override void OnSelect( CableLocation location, CableGroup group )
        {
            // Do nothing
            if (null == group)
                return;

            // Convert and forward
            LegacyDevice.Tune( group.ToLegacy(), null );
        }
    }
}
