using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceModels.LabSample
{
    public class LabSample
    {
        public int Lab_Sample_Tracking_Id { get; set; }
        public int? Production_Line_Id { get; set; }
        public string Production_Line { get; set; } //length 50 and not null
        public int Production_Unit_Id { get; set; }
        public string Production_Unit { get; set; }//length 50 and not null
        public int Product_Id { get; set; }
        public string Product_Desc { get; set; }//length 50 and not null
        public string Var_Desc { get; set; }//length 50 and not null
        public string Sample_Taken_By { get; set; }//length 50 and not null
        public DateTime? Date_Sample_Taken { get; set; }//not null
        public string Time_Sample_Taken { get; set; }//length 10 and not null
        public string Sample_Type { get; set; }//length 50 and not null
        public string Sample_Status { get; set; }//length 50 and not null
        public string Sample_Delivered_To_Lab_By { get; set; }//length 50 and not null\
        public DateTime? Sample_Delivered_Date_Time { get; set; }//not null
        public string Sample_Delivered_Time { get; set; }//length 10 and not null
        public string Sample_Given_To { get; set; }//length 50 and not null
        public DateTime? QC_Test_Completed_Date { get; set; }//not null
        public string QC_Test_Completed_Time { get; set; }//length 10 and not null
        public string Results { get; set; }//length 50 and null
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
    }
}
