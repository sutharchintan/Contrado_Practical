using System.Collections.Generic;

namespace ECommerceLibrary.Database
{
    /// <summary>
    /// interface to define methods of databse service
    /// </summary>
    public interface IDatabaseService
    {
        /// <summary>
        /// execute query and giving the expected result
        /// </summary>
        /// <typeparam name="T">the type of model</typeparam>
        /// <param name="query">the query to execute with database</param>
        /// <returns>the list of model</returns>
        List<T> ExecuteQuery<T>(string query);

        /// <summary>
        /// the record list from database using store procedure and parameters
        /// </summary>
        /// <typeparam name="T">the model type</typeparam>
        /// <param name="storeProcName">the store procedure name</param>
        /// <param name="parameters">the parameters</param>
        /// <returns>the list of model</returns>
        List<T> RecordList<T>(string storeProcName, object parameters);

        /// <summary>
        /// executes the stores procedure
        /// </summary>
        /// <typeparam name="T">the model type</typeparam>
        /// <param name="storeProcName">the store procedure name</param>
        /// <param name="parameters">the parameters</param>
        /// <returns>the list of models</returns>
        List<T> ExecuteStoreProcedure<T>(string storeProcName, object parameters);

        /// <summary>
        /// executes the store procedure to add, edit or delete record
        /// </summary>
        /// <param name="storeProcName">the store procedure name</param>
        /// <param name="parameters">the parameters</param>
        /// <returns>returs the scalar result</returns>
        int RecordAddUpdateDelete(string storeProcName, object parameters);
    }
}
