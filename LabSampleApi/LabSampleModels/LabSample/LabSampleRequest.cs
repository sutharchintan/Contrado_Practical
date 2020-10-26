using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceModels.LabSample
{
    public class LabSampleRequest
    {
        public int userId { get; set; }

        public string roleName { get; set; } 

        public string product_line { get; set; }

        public string product_unit { get; set; }

        public string product_desc { get; set; }
    }
}
