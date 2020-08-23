using Dapper;
using ECommerceLibrary.Constants;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceLibrary.Database
{

    /// <summary>
    /// sql service class
    /// </summary>
    public class SqlService : IDatabaseService
    {
        /// <summary>
        /// defines the sql connection
        /// </summary>
        private readonly SqlConnection connection;

        /// <summary>
        /// defines the sql transaction
        /// </summary>
        private static SqlTransaction sqlTransaction;

        /// <summary>
        /// initialize the sql service
        /// </summary>
        /// <param name="configuration">the configuration</param>
        public SqlService()
        {
            string connectionString = ConfigurationManager.AppSettings[ConfigurationConstants.ConnectionStringName];
            this.connection = new SqlConnection(connectionString);
        }

        /// <summary>
        /// begin transaction
        /// </summary>
        public void BeginTransaction()
        {
            if (sqlTransaction == null)
            {
                sqlTransaction = this.connection.BeginTransaction();
            }
        }

        /// <summary>
        /// commit transaction
        /// </summary>
        public void Commit()
        {
            if (sqlTransaction != null)
            {
                sqlTransaction.Commit();
            }
        }

        /// <summary>
        /// rollback transaction if error is there
        /// </summary>
        public void Rollback()
        {
            if (sqlTransaction != null)
            {
                sqlTransaction.Rollback();
            }
        }

        /// <summary>
        /// open the connection
        /// </summary>
        public void Open()
        {
            if (connection.State == ConnectionState.Closed)
            {
                this.connection.Open();
            }
        }

        /// <summary>
        /// close the connection
        /// </summary>
        public void Close()
        {
            if (connection.State == ConnectionState.Open)
            {
                this.connection.Close();
            }
        }

        /// <summary>
        /// execute query and giving the expected result
        /// </summary>
        /// <typeparam name="T">the type of model</typeparam>
        /// <param name="query">the query to execute with database</param>
        /// <returns>the list of model</returns>
        public List<T> ExecuteQuery<T>(string query)
        {
            try
            {
                this.Open();
                var list = this.connection.Query<T>(query).ToList();
                return list;
            }
            catch (Exception exception)
            {
                throw exception;
            }
            finally
            {
                this.Close();
            }
        }

        /// <summary>
        /// executes the stores procedure
        /// </summary>
        /// <typeparam name="T">the model type</typeparam>
        /// <param name="storeProcName">the store procedure name</param>
        /// <param name="parameters">the parameters</param>
        /// <returns>the list of models</returns>
        public List<T> ExecuteStoreProcedure<T>(string storeProcName, object parameters)
        {
            try
            {
                this.Open();
                return this.connection.Query<T>(storeProcName, parameters, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception exception)
            {
                throw exception;
            }
            finally
            {
                this.Close();
            }
        }

        /// <summary>
        /// the record list from database using store procedure and parameters
        /// </summary>
        /// <typeparam name="T">the model type</typeparam>
        /// <param name="storeProcName">the store procedure name</param>
        /// <param name="parameters">the parameters</param>
        /// <returns>the list of model</returns>
        public List<T> RecordList<T>(string storeProcName, object parameters)
        {
            try
            {
                this.Open();
                var list = this.connection.Query<T>(storeProcName, parameters, commandType: CommandType.StoredProcedure).ToList();
                return list;
            }
            catch (Exception exception)
            {
                throw exception;
            }
            finally
            {
                this.Close();
            }
        }

        /// <summary>
        /// executes the store procedure to add, edit or delete record
        /// </summary>
        /// <param name="storeProcName">the store procedure name</param>
        /// <param name="parameters">the parameters</param>
        /// <returns>returs the scalar result</returns>
        public int RecordAddUpdateDelete(string storeProcName, object parameters)
        {
            try
            {
                this.Open();
                return this.connection.Execute(storeProcName, parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception exception)
            {
                throw exception;
            }
            finally
            {
                this.Close();
            }
        }

        /// <summary>
        /// execute scalar
        /// </summary>
        /// <param name="commandText">the command text</param>
        /// <param name="commandType">the command type</param>
        /// <param name="params">the sql parameters</param>
        /// <returns>the object for query result</returns>
        public object ExecuteScalar(string commandText, CommandType commandType, SqlParameter[] @params)
        {
            try
            {
                this.Open();
                var command = new SqlCommand(commandText, this.connection);
                command.CommandType = commandType;
                command.Transaction = sqlTransaction;

                if (@params != null)
                {
                    command.Parameters.AddRange(@params);
                }

                return command.ExecuteScalar();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                this.Close();
            }
        }

        /// <summary>
        /// execute the non query
        /// </summary>
        /// <param name="commandText">the command text</param>
        /// <param name="commandType">the command type</param>
        /// <param name="params">the sql parameters</param>
        /// <returns>the execute non query</returns>
        public int ExecuteNonQuery(string commandText, CommandType commandType, SqlParameter[] @params)
        {
            try
            {
                this.Open();
                var command = new SqlCommand(commandText, this.connection);
                command.CommandType = commandType;
                command.Transaction = sqlTransaction;

                if (@params != null)
                    command.Parameters.AddRange(@params);

                return command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                this.Close();
            }
        }

        /// <summary>
        /// execute reader with sql query
        /// </summary>
        /// <param name="commandText">the command text</param>
        /// <param name="commandType">the command type</param>
        /// <param name="params">the sql parameters</param>
        /// <returns>the string result</returns>
        public string ExecuteReader(string commandText, CommandType commandType, SqlParameter[] @params)
        {
            try
            {
                this.Open();
                var command = new SqlCommand(commandText, this.connection);
                command.CommandType = commandType;
                command.Transaction = sqlTransaction;

                if (@params != null)
                    command.Parameters.AddRange(@params);

                var reader = command.ExecuteReader();

                if (reader.HasRows)
                {
                }

                return string.Empty;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                this.Close();
            }
        }

        /// <summary>
        /// get the table
        /// </summary>
        /// <param name="commandText">the command text</param>
        /// <param name="commandType">the command type</param>
        /// <param name="params">the sql parameters</param>
        /// <returns>the data table</returns>
        public DataTable GetTable(string commandText, CommandType commandType, SqlParameter[] @params)
        {
            try
            {
                this.Open();

                var command = new SqlCommand(commandText, this.connection);
                command.CommandType = commandType;

                if (@params != null)
                    command.Parameters.AddRange(@params);

                var dataTable = new DataTable();
                using (SqlDataAdapter dataAdapter = new SqlDataAdapter(command))
                {
                    dataAdapter.Fill(dataTable);
                }

                return dataTable;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                this.Close();
            }
        }
    }
}
