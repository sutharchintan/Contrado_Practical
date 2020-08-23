import React, { useState, useEffect } from 'react';
import { Accordion, AccordionDetails, FormControl, FormGroup, FormLabel, TextField, Grid, Select, MenuItem, withStyles } from '@material-ui/core';
import { ComponentRoutes, CommonElements } from '../../enums';
import DetailActions from '../layout/detail-actions';
import { ProductAttributeLookup, DropDownModel } from '../../models';
import PanelTitle from '../layout/panel-title';

interface Props {
    classes: any;

    model: ProductAttributeLookup;

    loadCategories: () => any;

    addData: (model: ProductAttributeLookup) => any;

    updateData: (model: ProductAttributeLookup) => any;

    clearRecord: () => void;
}

const Styles = {
    formControl : {
        padding: 8
    }
}

const ProductAttributeLookupComponent = (props: Props) => {
    const [name, setName] = useState<string | null>();
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

        if (props.model && props.model.AttributeId) {
            setID(props.model.AttributeId);
            setName(props.model.AttributeName);
            setCategoryId(props.model.ProdCatId.toString());
        }
    }

    const onSave = async () => {
        const model = new ProductAttributeLookup();
        if (id) {
            model.AttributeId = id;
            model.ProdCatId = +categoryId;
            model.AttributeName = name;
            await props.updateData(model);
        } else {
            model.ProdCatId = +categoryId;
            model.AttributeName = name;
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
            <PanelTitle title="Product Attribute Lookup - Add/Edit" componentLink={ComponentRoutes.ProductAttributes} buttonText="Back"></PanelTitle>
            {
                renderDetails()
            }
            <DetailActions handleCancel={onCancel} handleSave={onSave} backLink={ComponentRoutes.ProductAttributes} />
        </Accordion>
    );
}

export default withStyles(Styles)(ProductAttributeLookupComponent);