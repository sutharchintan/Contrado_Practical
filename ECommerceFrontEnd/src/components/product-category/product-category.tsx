import React, { useState, useEffect } from 'react';
import { Accordion, AccordionDetails, Grid, FormGroup, FormControl, FormLabel, TextField } from '@material-ui/core';
import PanelTitle from '../layout/panel-title';
import { ComponentRoutes, CommonElements } from '../../enums';
import { ProductCategoryModel } from '../../models';
import DetailActions from '../layout/detail-actions';

interface Props {
    model: ProductCategoryModel;

    addData: (model: ProductCategoryModel) => any;

    updateData: (model: ProductCategoryModel) => any;

    clearRecord: () => void;
}

const ProductCategory = (props: Props) => {
    const [name, setName] = useState<string | null>();
    const [id, setID] = useState<number | null>();

    useEffect(() => {
        if (props.model && props.model.ProdCatId) {
            setID(props.model.ProdCatId);
            setName(props.model.CategoryName);
        }
    }, [props.model])

    const onSave = async () => {
        const model = new ProductCategoryModel();
        if (id) {
            model.ProdCatId = id;
            model.CategoryName = name;
            await props.updateData(model);
        } else {
            model.CategoryName = name;
            await props.addData(model);
        }

        onCancel();
    }

    const onCancel = () => {
        props.clearRecord();
        const linkElement = document.getElementById(CommonElements.list_link);
        if(linkElement) {
            linkElement.click();
        }
    }

    const renderNameElement = () => {
        return (
            <FormControl>
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
                        </FormGroup>
                    </Grid>
                    <Grid item md={3} />
                </Grid>
            </AccordionDetails>
        )
    }   

    return (
        <Accordion style={{ margin: 0 }} defaultExpanded>
            <PanelTitle title="Product Category - Add/Edit" componentLink={ComponentRoutes.ProductCategories} buttonText="Back"></PanelTitle>
            {
                renderDetails()
            }
            <DetailActions handleCancel={onCancel} handleSave={onSave} backLink={ComponentRoutes.ProductCategories} />
        </Accordion>
    )
}

export default ProductCategory;