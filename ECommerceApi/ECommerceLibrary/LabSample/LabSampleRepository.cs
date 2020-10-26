using ECommerceLibrary.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceLibrary.LabSample
{
    public class LabSampleRepository : BaseRepository
    {
        public LabSampleRepository(IDatabaseService databaseService) : base(databaseService)
        {

        }

        public void AddLabSample(ECommerceModels.LabSample.LabSample labSample)
        {
            this.databaseService.RecordAddUpdateDelete(LabSampleConstants.Add,
                    new
                    {

                        //@Lab_Sample_Tracking_Id = labSample.Lab_Sample_Tracking_Id,
                        @Production_Line_Id = labSample.Production_Line_Id,
                        @Production_Line = labSample.Production_Line,
                        @Production_Unit_Id = labSample.Production_Unit_Id,
                        @Production_Unit = labSample.Production_Unit,
                        @Product_Id = labSample.Product_Id,
                        @Product_Desc = labSample.Product_Desc,
                        @Var_Desc = labSample.Var_Desc,
                        @Sample_Taken_By = labSample.Sample_Taken_By,
                        @Date_Sample_Taken = labSample.Date_Sample_Taken,
                        @Time_Sample_Taken = labSample.Time_Sample_Taken,
                        @Sample_Type = labSample.Sample_Type,
                        @Sample_Status = labSample.Sample_Status,
                        @Sample_Delivered_To_Lab_By = labSample.Sample_Delivered_To_Lab_By,
                        @Sample_Delivered_Date_Time = labSample.Sample_Delivered_Date_Time,
                        @Sample_Delivered_Time = labSample.Sample_Delivered_Time,
                        @Sample_Given_To = labSample.Sample_Given_To,
                        @QC_Test_Completed_Date = labSample.QC_Test_Completed_Date,
                        @QC_Test_Completed_Time = labSample.QC_Test_Completed_Time,
                        @Results = labSample.Results,
                        @CreatedBy = labSample.CreatedBy
                    });
        }

        public void UppdateLabSample(ECommerceModels.LabSample.LabSample labSample)
        {
            this.databaseService.RecordAddUpdateDelete(LabSampleConstants.Update,
                    new
                    {
                        @Lab_Sample_Tracking_Id = labSample.Lab_Sample_Tracking_Id,
                        @Production_Line_Id = labSample.Production_Line_Id,
                        @Production_Line = labSample.Production_Line,
                        @Production_Unit_Id = labSample.Production_Unit_Id,
                        @Production_Unit = labSample.Production_Unit,
                        @Product_Id = labSample.Product_Id,
                        @Product_Desc = labSample.Product_Desc,
                        @Var_Desc = labSample.Var_Desc,
                        @Sample_Taken_By = labSample.Sample_Taken_By,
                        @Date_Sample_Taken = labSample.Date_Sample_Taken,
                        @Time_Sample_Taken = labSample.Time_Sample_Taken,
                        @Sample_Type = labSample.Sample_Type,
                        @Sample_Status = labSample.Sample_Status,
                        @Sample_Delivered_To_Lab_By = labSample.Sample_Delivered_To_Lab_By,
                        @Sample_Delivered_Date_Time = labSample.Sample_Delivered_Date_Time,
                        @Sample_Delivered_Time = labSample.Sample_Delivered_Time,
                        @Sample_Given_To = labSample.Sample_Given_To,
                        @QC_Test_Completed_Date = labSample.QC_Test_Completed_Date,
                        @QC_Test_Completed_Time = labSample.QC_Test_Completed_Time,
                        @Results = labSample.Results,
                        @UpdatedBy = labSample.UpdatedBy
                    });
        }

        public List<ECommerceModels.LabSample.LabSample> GetLabSample(int userId, string roleName)
        {
            return this.databaseService.RecordList<ECommerceModels.LabSample.LabSample>(LabSampleConstants.List,
                     new
                     {
                         @UserId = userId,
                         @RoleName = roleName,

                     });
        }

        public List<ECommerceModels.LabSample.LabSample> ViewSamples(int userId, string roleName)
        {
            return this.databaseService.RecordList<ECommerceModels.LabSample.LabSample>(LabSampleConstants.ViewList,
                     new
                     {
                         @UserId = userId,
                         @RoleName = roleName,
                     });
        }
    }
}
