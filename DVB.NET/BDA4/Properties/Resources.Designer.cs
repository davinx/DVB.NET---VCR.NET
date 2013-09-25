﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.235
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace JMS.DVB.DeviceAccess.Properties {
    using System;
    
    
    /// <summary>
    ///   A strongly-typed resource class, for looking up localized strings, etc.
    /// </summary>
    // This class was auto-generated by the StronglyTypedResourceBuilder
    // class via a tool like ResGen or Visual Studio.
    // To add or remove a member, edit your .ResX file then rerun ResGen
    // with the /str option, or rebuild your VS project.
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("System.Resources.Tools.StronglyTypedResourceBuilder", "4.0.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    internal class Resources {
        
        private static global::System.Resources.ResourceManager resourceMan;
        
        private static global::System.Globalization.CultureInfo resourceCulture;
        
        [global::System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")]
        internal Resources() {
        }
        
        /// <summary>
        ///   Returns the cached ResourceManager instance used by this class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        internal static global::System.Resources.ResourceManager ResourceManager {
            get {
                if (object.ReferenceEquals(resourceMan, null)) {
                    global::System.Resources.ResourceManager temp = new global::System.Resources.ResourceManager("JMS.DVB.DeviceAccess.Properties.Resources", typeof(Resources).Assembly);
                    resourceMan = temp;
                }
                return resourceMan;
            }
        }
        
        /// <summary>
        ///   Overrides the current thread's CurrentUICulture property for all
        ///   resource lookups using this strongly typed resource class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        internal static global::System.Globalization.CultureInfo Culture {
            get {
                return resourceCulture;
            }
            set {
                resourceCulture = value;
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Could not create {0}.
        /// </summary>
        internal static string Exception_BadFilter {
            get {
                return ResourceManager.GetString("Exception_BadFilter", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Unable to use Filter for Input Pin.
        /// </summary>
        internal static string Exception_BadInputPinFilter {
            get {
                return ResourceManager.GetString("Exception_BadInputPinFilter", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to There is more than one Pin on the selected Side of the Filter.
        /// </summary>
        internal static string Exception_DuplicateEndpoint {
            get {
                return ResourceManager.GetString("Exception_DuplicateEndpoint", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Tuner Filter not defined.
        /// </summary>
        internal static string Exception_MissingTuner {
            get {
                return ResourceManager.GetString("Exception_MissingTuner", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Encryption is not supported.
        /// </summary>
        internal static string Exception_NoCICAM {
            get {
                return ResourceManager.GetString("Exception_NoCICAM", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to There is no Primary Step in this List.
        /// </summary>
        internal static string Exception_NoDefaultAction {
            get {
                return ResourceManager.GetString("Exception_NoDefaultAction", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to There is no Pin on the selected Side of the Filter.
        /// </summary>
        internal static string Exception_NoEndpoint {
            get {
                return ResourceManager.GetString("Exception_NoEndpoint", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to The Graph must at least be created before tuning a Source Group.
        /// </summary>
        internal static string Exception_NotStarted {
            get {
                return ResourceManager.GetString("Exception_NotStarted", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Error in {1} of Pipeline {0}: {2}.
        /// </summary>
        internal static string Exception_PipelineAction {
            get {
                return ResourceManager.GetString("Exception_PipelineAction", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Unable to start Graph, got error 0x{0:x}.
        /// </summary>
        internal static string Exception_StartGraph {
            get {
                return ResourceManager.GetString("Exception_StartGraph", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Unable to stop the Transport Information Filter (TIF).
        /// </summary>
        internal static string Exception_StopTIF {
            get {
                return ResourceManager.GetString("Exception_StopTIF", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Unable to connect the Transport Information Filter (TIF).
        /// </summary>
        internal static string Exception_TIF {
            get {
                return ResourceManager.GetString("Exception_TIF", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Receiption of {0} is currently not supported.
        /// </summary>
        internal static string Exception_UnsupportedDVBType {
            get {
                return ResourceManager.GetString("Exception_UnsupportedDVBType", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to The Action does not belong to the current Pipeline.
        /// </summary>
        internal static string Exception_WrongPipeline {
            get {
                return ResourceManager.GetString("Exception_WrongPipeline", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Decryption.
        /// </summary>
        internal static string Pipeline_Decrypt {
            get {
                return ResourceManager.GetString("Pipeline_Decrypt", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Signalinformation.
        /// </summary>
        internal static string Pipeline_Signal {
            get {
                return ResourceManager.GetString("Pipeline_Signal", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Tune.
        /// </summary>
        internal static string Pipeline_Tune {
            get {
                return ResourceManager.GetString("Pipeline_Tune", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Finalizing Step {0}.
        /// </summary>
        internal static string Step_Finish {
            get {
                return ResourceManager.GetString("Step_Finish", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Primary Step.
        /// </summary>
        internal static string Step_Main {
            get {
                return ResourceManager.GetString("Step_Main", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Preparation Step {0}.
        /// </summary>
        internal static string Step_Prepare {
            get {
                return ResourceManager.GetString("Step_Prepare", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Writing raw Transport Stream to {0}.
        /// </summary>
        internal static string Trace_Dump {
            get {
                return ResourceManager.GetString("Trace_Dump", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Signal locked after {0} Tries ({1} left), FastTune is {2}.
        /// </summary>
        internal static string Trace_Lock {
            get {
                return ResourceManager.GetString("Trace_Lock", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Stream Consistency check stopped after {0} Tries ({1} left), found {2} Table(s), received {3:N0} Byte(s).
        /// </summary>
        internal static string Trace_StreamOk {
            get {
                return ResourceManager.GetString("Trace_StreamOk", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Found no PAT - retrying tune operation.
        /// </summary>
        internal static string Trace_TuneFailed {
            get {
                return ResourceManager.GetString("Trace_TuneFailed", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Tuning to {1} ({0}).
        /// </summary>
        internal static string Trace_TuneStart {
            get {
                return ResourceManager.GetString("Trace_TuneStart", resourceCulture);
            }
        }
    }
}
