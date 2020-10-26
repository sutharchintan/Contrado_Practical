using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceLibrary.Account
{
    public class Login
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }

    public class LoggedInUser
    {
        public int Lab_Sample_Tracking_User_ID { get; set; }
        public string User_Code { get; set; }
        public int Lab_Sample_Tracking_Role_Id { get; set; }
        public string Role_Name { get; set; }
    }
}
