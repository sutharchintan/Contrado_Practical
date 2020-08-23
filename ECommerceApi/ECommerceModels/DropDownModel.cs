using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceModels
{
    /// <summary>
    /// class for drop down model
    /// </summary>
    public class DropDownModel
    {
        /// <summary>
        /// defines the value property
        /// </summary>
        public string Value { get; set; }

        /// <summary>
        /// defines the label
        /// </summary>
        public string Label { get; set; }

        /// <summary>
        /// defines whether it selected in case of multiple selection
        /// </summary>
        public bool Selected { get; set; }
    }
}
