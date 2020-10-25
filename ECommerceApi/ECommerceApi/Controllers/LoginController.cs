using ECommerceApi.Models;
using ECommerceLibrary;
using ECommerceLibrary.Account;
using ECommerceLibrary.Login;
using ECommerceModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Security;

namespace ECommerceApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class LoginController : ApiController
    {
        [DllImport("ADVAPI32.dll", EntryPoint = "LogonUserW", SetLastError = true, CharSet = CharSet.Auto)]
        public static extern bool LogonUser(string lpszUsername, string lpszDomain, string lpszPassword, int dwLogonType, int dwLogonProvider, ref IntPtr phToken);

        private readonly LoginRepository loginRepository;
        private readonly ILogger logger;

        public LoginController(LoginRepository loginRepository, ILogger logger)
        {
            this.loginRepository = loginRepository;
            this.logger = logger;
        }

        public static string GetDomainName(string usernameDomain)
        {
            if (string.IsNullOrEmpty(usernameDomain))
            {
                throw (new ArgumentException("Argument can't be null.", "usernameDomain"));
            }
            if (usernameDomain.Contains("\\"))
            {
                int index = usernameDomain.IndexOf("\\");
                return usernameDomain.Substring(0, index);
            }
            else if (usernameDomain.Contains("@"))
            {
                int index = usernameDomain.IndexOf("@");
                return usernameDomain.Substring(index + 1);
            }
            else
            {
                return "";
            }
        }

        /// <summary>
        /// Parses the string to pull the user name out.
        /// </summary>
        /// <param name="usernameDomain">The string to parse that must contain the username in either the domain\username or UPN format username@domain</param>
        /// <returns>The username or the string if no domain is found.</returns>
        public static string GetUsername(string usernameDomain)
        {
            if (string.IsNullOrEmpty(usernameDomain))
            {
                throw (new ArgumentException("Argument can't be null.", "usernameDomain"));
            }
            if (usernameDomain.Contains("\\"))
            {
                int index = usernameDomain.IndexOf("\\");
                return usernameDomain.Substring(index + 1);
            }
            else if (usernameDomain.Contains("@"))
            {
                int index = usernameDomain.IndexOf("@");
                return usernameDomain.Substring(0, index);
            }
            else
            {
                return usernameDomain;
            }
        }


        [HttpPost]
        public ApiResult<LoggedInUser> Login(Login login)
        {
            Exception ex = new Exception("Invalid Username or Password");
            if (ModelState.IsValid)
            {
                string domainName = GetDomainName(login.Username); // Extract domain name form provide DomainUsername e.g Domainname\Username
                string userName = GetUsername(login.Username);  // Extract user name from provided DomainUsername e.g Domainname\Username
                IntPtr token = IntPtr.Zero;

                bool valid = LogonUser(userName, domainName, login.Password, 2, 0, ref token);
                if (valid)
                {
                    var user = this.loginRepository.GetLoggedInUser(userName);
                    if (user != null)
                    {
                        FormsAuthentication.SetAuthCookie(login.Username, false);
                        return ApiResult<LoggedInUser>.Success(user);
                        // HttpContext.Session.Add(UserStoreProcedures.User_Id_Session, user.User_Id);
                    }
                    else
                    {

                        return ApiResult<LoggedInUser>.Exception(this.logger.LogException(ex));
                    }
                }
                else
                {
                    return ApiResult<LoggedInUser>.Exception(this.logger.LogException(ex));
                }
            }
            else
            {
                return ApiResult<LoggedInUser>.Exception(this.logger.LogException(ex));
            }
        }

        public void Logout()
        {
            FormsAuthentication.SignOut();
        }

        public bool IsUserAuthenticated()
        {
            return User.Identity.IsAuthenticated;
        }
    }
}
