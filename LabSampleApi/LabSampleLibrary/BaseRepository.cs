using ECommerceLibrary.Database;

namespace ECommerceLibrary
{
    /// <summary>
    /// class for base repository
    /// </summary>
    public class BaseRepository
    {
        /// <summary>
        /// protected database service
        /// </summary>
        protected readonly IDatabaseService databaseService;

        /// <summary>
        /// instance for base repository
        /// </summary>
        /// <param name="databaseService">the database service</param>
        public BaseRepository(IDatabaseService databaseService)
        {
            this.databaseService = databaseService;
        }
    }
}
