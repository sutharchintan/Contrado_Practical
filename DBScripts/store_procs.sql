USE [ECommerceDemo]
GO

/****** Object:  StoredProcedure [dbo].[Product_Add]    Script Date: 24-08-2020 09:35:16 ******/
DROP PROCEDURE [dbo].[Product_Add]
GO

/****** Object:  StoredProcedure [dbo].[Product_Add]    Script Date: 24-08-2020 09:35:16 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create PROC [dbo].[Product_Add]
	@ProdName varchar(250),
	@ProdDescription varchar(max),
	@ProdCatId int
AS
BEGIN
SET NOCOUNT ON;
	
	INSERT INTO Product ( ProdName, ProdDescription, ProdCatId)
	VALUES (@ProdName, @ProdDescription, @ProdCatId)

	SELECT SCOPE_IDENTITY()
	
END
GO


USE [ECommerceDemo]
GO

/****** Object:  StoredProcedure [dbo].[Product_Count]    Script Date: 24-08-2020 09:35:31 ******/
DROP PROCEDURE [dbo].[Product_Count]
GO

/****** Object:  StoredProcedure [dbo].[Product_Count]    Script Date: 24-08-2020 09:35:31 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

 CREATE PROCEDURE [dbo].[Product_Count]
AS
BEGIN
	SELECT COUNT(1)
	FROM 
	Product
END
GO


USE [ECommerceDemo]
GO

/****** Object:  StoredProcedure [dbo].[Product_Delete]    Script Date: 24-08-2020 09:35:50 ******/
DROP PROCEDURE [dbo].[Product_Delete]
GO

/****** Object:  StoredProcedure [dbo].[Product_Delete]    Script Date: 24-08-2020 09:35:50 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create PROC [dbo].[Product_Delete]
	@ProductId BIGINT
AS
BEGIN
SET NOCOUNT ON;
	
	DELETE FROM Product
	WHERE ProductId = @ProductId
	
END
GO


USE [ECommerceDemo]
GO

/****** Object:  StoredProcedure [dbo].[Product_DropDown]    Script Date: 24-08-2020 09:36:02 ******/
DROP PROCEDURE [dbo].[Product_DropDown]
GO

/****** Object:  StoredProcedure [dbo].[Product_DropDown]    Script Date: 24-08-2020 09:36:02 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[Product_DropDown] 
AS
BEGIN
	SELECT ProductId as [Value], ProdName as [Label]
	FROM Product
END
GO


USE [ECommerceDemo]
GO

/****** Object:  StoredProcedure [dbo].[Product_List]    Script Date: 24-08-2020 09:36:21 ******/
DROP PROCEDURE [dbo].[Product_List]
GO

/****** Object:  StoredProcedure [dbo].[Product_List]    Script Date: 24-08-2020 09:36:21 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[Product_List]
	@PageNumber INT = 1,
	@PageSize   INT = 10	
AS
BEGIN
	SET NOCOUNT ON;
 
	SELECT 
		ProductId, ProdCatId, ProdName, ProdDescription
	FROM [Product]	
	ORDER BY ProdName
	OFFSET @PageSize * (@PageNumber - 1) ROWS
    FETCH NEXT @PageSize ROWS ONLY OPTION (RECOMPILE); 

END
GO


USE [ECommerceDemo]
GO

/****** Object:  StoredProcedure [dbo].[Product_Update]    Script Date: 24-08-2020 09:36:34 ******/
DROP PROCEDURE [dbo].[Product_Update]
GO

/****** Object:  StoredProcedure [dbo].[Product_Update]    Script Date: 24-08-2020 09:36:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create PROC [dbo].[Product_Update]
	@ProductId bigint,
	@ProdName varchar(250),
	@ProdDescription varchar(max),
	@ProdCatId int
AS
BEGIN
	SET NOCOUNT ON;
	
	UPDATE 
		Product 
	SET ProdName =@ProdName, 
		ProdDescription = @ProdDescription, 
		ProdCatId = @ProdCatId
	WHERE
		ProductId = @ProductId
END
GO


USE [ECommerceDemo]
GO

/****** Object:  StoredProcedure [dbo].[ProductAttribute_Add]    Script Date: 24-08-2020 09:36:47 ******/
DROP PROCEDURE [dbo].[ProductAttribute_Add]
GO

/****** Object:  StoredProcedure [dbo].[ProductAttribute_Add]    Script Date: 24-08-2020 09:36:47 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create PROC [dbo].[ProductAttribute_Add]
	@ProductId bigint,
	@AttributeId int,
	@AttributeValue varchar(250)
AS
BEGIN
	SET NOCOUNT ON;
	
	INSERT INTO ProductAttribute (ProductId , AttributeId, AttributeValue)
	VALUES (@ProductId , @AttributeId, @AttributeValue)

	SELECT SCOPE_IDENTITY()
	
END
GO


USE [ECommerceDemo]
GO

/****** Object:  StoredProcedure [dbo].[ProductAttribute_Count]    Script Date: 24-08-2020 09:36:56 ******/
DROP PROCEDURE [dbo].[ProductAttribute_Count]
GO

/****** Object:  StoredProcedure [dbo].[ProductAttribute_Count]    Script Date: 24-08-2020 09:36:56 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

 CREATE PROCEDURE [dbo].[ProductAttribute_Count]
AS
BEGIN
	SELECT COUNT(1)
	FROM 
	ProductAttribute
END
GO


USE [ECommerceDemo]
GO

/****** Object:  StoredProcedure [dbo].[ProductAttribute_Delete]    Script Date: 24-08-2020 09:37:06 ******/
DROP PROCEDURE [dbo].[ProductAttribute_Delete]
GO

/****** Object:  StoredProcedure [dbo].[ProductAttribute_Delete]    Script Date: 24-08-2020 09:37:06 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create PROC [dbo].[ProductAttribute_Delete]
	@ProductId INT
AS
BEGIN
SET NOCOUNT ON;
	
	DELETE FROM ProductAttribute
	WHERE ProductId = @ProductId
	
END
GO


USE [ECommerceDemo]
GO

/****** Object:  StoredProcedure [dbo].[ProductAttribute_List]    Script Date: 24-08-2020 09:37:23 ******/
DROP PROCEDURE [dbo].[ProductAttribute_List]
GO

/****** Object:  StoredProcedure [dbo].[ProductAttribute_List]    Script Date: 24-08-2020 09:37:23 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[ProductAttribute_List]
	@PageNumber INT = 1,
	@PageSize   INT = 10	
AS
BEGIN
	SET NOCOUNT ON;
 
	SELECT 
		ProductId, AttributeId, AttributeValue
	FROM ProductAttribute	
	ORDER BY AttributeValue
	OFFSET @PageSize * (@PageNumber - 1) ROWS
    FETCH NEXT @PageSize ROWS ONLY OPTION (RECOMPILE); 

END
GO


USE [ECommerceDemo]
GO

/****** Object:  StoredProcedure [dbo].[ProductAttributeLookup_Add]    Script Date: 24-08-2020 09:37:39 ******/
DROP PROCEDURE [dbo].[ProductAttributeLookup_Add]
GO

/****** Object:  StoredProcedure [dbo].[ProductAttributeLookup_Add]    Script Date: 24-08-2020 09:37:39 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create PROC [dbo].[ProductAttributeLookup_Add]
	@ProdCatId int,
	@AttributeName varchar(250)
AS
BEGIN
	SET NOCOUNT ON;
	
	INSERT INTO ProductAttributeLookup (ProdCatId, AttributeName)
	VALUES (@ProdCatId , @AttributeName)

	SELECT SCOPE_IDENTITY()
	
END
GO


USE [ECommerceDemo]
GO

/****** Object:  StoredProcedure [dbo].[ProductAttributeLookup_Count]    Script Date: 24-08-2020 09:37:52 ******/
DROP PROCEDURE [dbo].[ProductAttributeLookup_Count]
GO

/****** Object:  StoredProcedure [dbo].[ProductAttributeLookup_Count]    Script Date: 24-08-2020 09:37:52 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

 CREATE PROCEDURE [dbo].[ProductAttributeLookup_Count]
AS
BEGIN
	SELECT COUNT(1)
	FROM 
	ProductAttributeLookup
END
GO


USE [ECommerceDemo]
GO

/****** Object:  StoredProcedure [dbo].[ProductAttributeLookup_Delete]    Script Date: 24-08-2020 09:38:00 ******/
DROP PROCEDURE [dbo].[ProductAttributeLookup_Delete]
GO

/****** Object:  StoredProcedure [dbo].[ProductAttributeLookup_Delete]    Script Date: 24-08-2020 09:38:00 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create PROC [dbo].[ProductAttributeLookup_Delete]
	@AttributeId INT
AS
BEGIN
SET NOCOUNT ON;
	
	DELETE FROM ProductAttributeLookup
	WHERE AttributeId = @AttributeId
	
END
GO


USE [ECommerceDemo]
GO

/****** Object:  StoredProcedure [dbo].[ProductAttributeLookup_List]    Script Date: 24-08-2020 09:38:17 ******/
DROP PROCEDURE [dbo].[ProductAttributeLookup_List]
GO

/****** Object:  StoredProcedure [dbo].[ProductAttributeLookup_List]    Script Date: 24-08-2020 09:38:17 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[ProductAttributeLookup_List]
	@PageNumber INT = 1,
	@PageSize   INT = 10	
AS
BEGIN
	SET NOCOUNT ON;
 
	SELECT 
		AttributeId, ProdCatId, AttributeName
	FROM ProductAttributeLookup	
	ORDER BY AttributeName
	OFFSET @PageSize * (@PageNumber - 1) ROWS
    FETCH NEXT @PageSize ROWS ONLY OPTION (RECOMPILE); 

END
GO


USE [ECommerceDemo]
GO

/****** Object:  StoredProcedure [dbo].[ProductAttributeLookup_Update]    Script Date: 24-08-2020 09:38:26 ******/
DROP PROCEDURE [dbo].[ProductAttributeLookup_Update]
GO

/****** Object:  StoredProcedure [dbo].[ProductAttributeLookup_Update]    Script Date: 24-08-2020 09:38:26 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create PROC [dbo].[ProductAttributeLookup_Update]
	@AttributeId int,
	@ProdCatId int,
	@AttributeName varchar(250)
AS
BEGIN
	SET NOCOUNT ON;
	
	UPDATE 
		ProductAttributeLookup 
	SET AttributeName =@AttributeName, 
		ProdCatId = @ProdCatId
	WHERE
		AttributeId = @AttributeId
END
GO


USE [ECommerceDemo]
GO

/****** Object:  StoredProcedure [dbo].[ProductCategory_Add]    Script Date: 24-08-2020 09:38:35 ******/
DROP PROCEDURE [dbo].[ProductCategory_Add]
GO

/****** Object:  StoredProcedure [dbo].[ProductCategory_Add]    Script Date: 24-08-2020 09:38:35 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create PROC [dbo].[ProductCategory_Add]
	@CategoryName varchar(250)
AS
BEGIN
SET NOCOUNT ON;
	
	INSERT INTO ProductCategory (CategoryName)
	VALUES (@CategoryName)

	SELECT SCOPE_IDENTITY()
	
END
GO


USE [ECommerceDemo]
GO

/****** Object:  StoredProcedure [dbo].[ProductCategory_Count]    Script Date: 24-08-2020 09:38:57 ******/
DROP PROCEDURE [dbo].[ProductCategory_Count]
GO

/****** Object:  StoredProcedure [dbo].[ProductCategory_Count]    Script Date: 24-08-2020 09:38:57 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

 CREATE PROCEDURE [dbo].[ProductCategory_Count]
AS
BEGIN
	SELECT COUNT(1)
	FROM 
	ProductCategory
END
GO


USE [ECommerceDemo]
GO

/****** Object:  StoredProcedure [dbo].[ProductCategory_Delete]    Script Date: 24-08-2020 09:39:06 ******/
DROP PROCEDURE [dbo].[ProductCategory_Delete]
GO

/****** Object:  StoredProcedure [dbo].[ProductCategory_Delete]    Script Date: 24-08-2020 09:39:06 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create PROC [dbo].[ProductCategory_Delete]
	@ProdCatId INT
AS
BEGIN
SET NOCOUNT ON;
	
	DELETE FROM ProductCategory
	WHERE ProdCatId = @ProdCatId
	
END
GO


USE [ECommerceDemo]
GO

/****** Object:  StoredProcedure [dbo].[ProductCategory_DropDown]    Script Date: 24-08-2020 09:39:16 ******/
DROP PROCEDURE [dbo].[ProductCategory_DropDown]
GO

/****** Object:  StoredProcedure [dbo].[ProductCategory_DropDown]    Script Date: 24-08-2020 09:39:16 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[ProductCategory_DropDown] 
AS
BEGIN
	SELECT ProdCatId as [Value], CategoryName as [Label]
	FROM ProductCategory
END
GO


USE [ECommerceDemo]
GO

/****** Object:  StoredProcedure [dbo].[ProductCategory_List]    Script Date: 24-08-2020 09:39:27 ******/
DROP PROCEDURE [dbo].[ProductCategory_List]
GO

/****** Object:  StoredProcedure [dbo].[ProductCategory_List]    Script Date: 24-08-2020 09:39:27 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROC [dbo].[ProductCategory_List]
	@PageNumber INT = 1,
	@PageSize   INT = 10	
AS
BEGIN
	SET NOCOUNT ON;
 
	SELECT 
		ProdCatId, CategoryName
	FROM ProductCategory	
	ORDER BY CategoryName
	OFFSET @PageSize * (@PageNumber - 1) ROWS
    FETCH NEXT @PageSize ROWS ONLY OPTION (RECOMPILE); 

END
GO


USE [ECommerceDemo]
GO

/****** Object:  StoredProcedure [dbo].[ProductCategory_Update]    Script Date: 24-08-2020 09:40:08 ******/
DROP PROCEDURE [dbo].[ProductCategory_Update]
GO

/****** Object:  StoredProcedure [dbo].[ProductCategory_Update]    Script Date: 24-08-2020 09:40:08 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

create PROC [dbo].[ProductCategory_Update]
	@ProdCatId int,
	@CategoryName varchar(250)
AS
BEGIN
	SET NOCOUNT ON;
	
	UPDATE 
		ProductCategory 
	SET CategoryName =@CategoryName
	WHERE
		ProdCatId = @ProdCatId
END
GO


