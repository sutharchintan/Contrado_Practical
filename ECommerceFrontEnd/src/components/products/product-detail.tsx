import React, { useState, useEffect } from 'react';
import { Accordion, AccordionDetails, FormControl, FormGroup, FormLabel, TextField, Grid, Select, MenuItem, withStyles } from '@material-ui/core';
import { ComponentRoutes, CommonElements } from '../../enums';
import DetailActions from '../layout/detail-actions';
import { ProductModel, DropDownModel } from '../../models';
import PanelTitle from '../layout/panel-title';

interface Props {
    classes: any;

    model: ProductModel;

    loadCategories: () => any;

    addData: (model: ProductModel) => any;

    updateData: (model: ProductModel) => any;

    clearRecord: () => void;
}

const ProductDetailStyles = {
    formControl : {
        padding: 8
    }
}

const ProductDetail = (props: Props) => {
    const [name, setName] = useState<string | null>();
    const [description, setDescription] = useState<string | null>();
    const [id, setID] = useState<number | null>();
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadCategories();
    }, [props.model])

    const loadCategories = async () => {
        const result = await props.loadCategories();
        if (result) {
            setCategories(result);
        }

        if (props.model && props.model.ProductId) {
            setID(props.model.ProductId);
            setName(props.model.ProdName);
            setCategoryId(props.model.ProdCatId.toString());
            setDescription(props.model.ProdDescription);
        }
    }

    const onSave = async () => {
        const model = new ProductModel();
        if (id) {
            model.ProductId = id;
            model.ProdCatId = +categoryId;
            model.ProdName = name;
            model.ProdDescription = description;
            await props.updateData(model);
        } else {
            model.ProdCatId = +categoryId;
            model.ProdName = name;
            model.ProdDescription = description;
            await props.addData(model);
        }

        onCancel();
    }

    const onCancel = () => {
        props.clearRecord();
        const linkElement = document.getElementById(CommonElements.list_link);
        if (linkElement) {
            linkElement.click();
        }
    }

    const renderNameElement = () => {
        return (
            <FormControl className={props.classes.formControl}>
                <FormGroup>
                    <FormLabel>
                        Name
                    </FormLabel>
                    <TextField
                        value={name}
                        onChange={event =>
                            setName(event.target.value)
                        }
                    />
                </FormGroup>
            </FormControl>
        )
    }

    const renderDescriptionElement = () => {
        return (
            <FormControl className={props.classes.formControl}>
                <FormGroup>
                    <FormLabel>
                        Description
                    </FormLabel>
                    <TextField
                        value={description}
                        onChange={event =>
                            setDescription(event.target.value)
                        }
                    />
                </FormGroup>
            </FormControl>
        )
    }

    const renderCategoryElement = () => {
        return (
            <FormControl className={props.classes.formControl}>
                <FormGroup>
                    <FormLabel>
                        Category
                    </FormLabel>
                    <Select
                        value={categoryId}
                        onChange={(e) => {
                            setCategoryId(e.target.value as any);
                        }}>

                        {
                            categories && categories.map((dropDownItem: DropDownModel, index) =>
                                <MenuItem key={index} value={dropDownItem.Value}>
                                    {dropDownItem.Label}
                                </MenuItem>
                            )
                        }
                    </Select>
                </FormGroup>
            </FormControl>
        )
    }

    const renderDetails = () => {
        return (
            <AccordionDetails>
                <Grid container>
                    <Grid item md={3} />
                    <Grid item md={6}>
                        <FormGroup>
                            {
                                renderNameElement()
                            }
                            {
                                renderDescriptionElement()
                            }
                            {
                                renderCategoryElement()
                            }
                        </FormGroup>
                    </Grid>
                    <Grid item md={3} />
                </Grid>
            </AccordionDetails>
        )
    }

    return (
        <Accordion style={{ margin: 0 }} defaultExpanded>
            <PanelTitle title="Product - Add/Edit" componentLink={ComponentRoutes.Products} buttonText="Back"></PanelTitle>
            {
                renderDetails()
            }
            <DetailActions handleCancel={onCancel} handleSave={onSave} backLink={ComponentRoutes.Products} />
        </Accordion>
    );
}

export default withStyles(ProductDetailStyles)(ProductDetail);