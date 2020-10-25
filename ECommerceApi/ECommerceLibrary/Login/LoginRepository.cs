using ECommerceLibrary.Account;
using ECommerceLibrary.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceLibrary.Login
{
    public class LoginRepository : BaseRepository
    {
        public LoginRepository(IDatabaseService databaseService) : base(databaseService)
        {

        }

        public LoggedInUser GetLoggedInUser(string userCode)
        {
            return this.databaseService.RecordList<LoggedInUser>(LoginConstants.LoggedInUser,
            new
            {
                @UserCode = userCode,
            }).FirstOrDefault();
        }
    }
}
