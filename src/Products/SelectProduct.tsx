import { Avatar, Box, Button, Checkbox, Dialog, DialogActions, DialogTitle, Divider, Grid, InputAdornment, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, TextField, Typography } from "@mui/material"
import CreateIcon from '@mui/icons-material/Create';
import IconButton from "@mui/material/IconButton";
import { useEffect, useRef, useState } from "react";
import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';

interface ISelectProduct {
    id: any
    obj: any,
    selectedProductList: any,
    setSelectedProductList: any,
    selectedProduct: any,
    setSelectedProduct: any,
    handleCallbackProductList: any,
    handleCallbackProduct: any
}

const SelectProduct = ({ id, obj, selectedProductList, setSelectedProductList, selectedProduct, setSelectedProduct, handleCallbackProduct, handleCallbackProductList }: ISelectProduct) => {

    const [open, setOpen] = useState<boolean>(false);
    const [displayedProducts, setDisplayedProducts] = useState<any>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [limit, setLimit] = useState<number>(10);
    const containerRef = useRef<HTMLDivElement>(null);

    const fetchProducts = async (limit: any) => {
        try {
            const resp = await fetch(`https://stageapi.monkcommerce.app/task/products/search?limit=${limit}&page=${limit / 10}`, {
                method: 'GET',
                headers: {
                    'x-api-key': '72njgfa948d9aS7gs5',
                    Accept : '*/*',
                },
            })

            if (!resp.ok) {
                throw new Error(`HTTP error! status: ${resp.status}`);
            }

            const result = await resp.json();
            const products = result.map((x: any) => ({
                id: x.id,
                name: x.title,
                image: x.image.src,
                checked: false,
                children: x.variants.map((y: any) => ({
                    id: y.id,
                    name: y.title,
                    price: y.price,
                    inventory_quantity: y.inventory_quantity,
                    checked: false,
                }))
            }));

            setDisplayedProducts([...displayedProducts, ...products]);
        } catch (error: any) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getSelectedProductCount = () => {
        let count = 0;
        selectedProductList.forEach((product: any) => {
            if (product.checked) {
                count++;
            }
        });
        return count;
    };

    useEffect(() => {
        fetchProducts(limit);
    }, [limit]);

    useEffect(() => {
        if (open) {
            const updatedDisplayedProducts = displayedProducts.map((product: any) => {
                const selectedProduct = selectedProductList.find((sp: any) => sp.id === product.id);
                if (selectedProduct) {
                    return {
                        ...product,
                        checked: true,
                        children: product.children.map((child: any) => {
                            const selectedChild = selectedProduct.children.find((sc: any) => sc.id === child.id);
                            return {
                                ...child,
                                checked: !!selectedChild,
                            };
                        })
                    };
                }
                return product;
            });

            setDisplayedProducts(updatedDisplayedProducts);
        }
    }, [open]);

    const handleScroll = (event: any) => {
        const { scrollTop, scrollHeight, clientHeight } = event.target;

        if (scrollHeight - scrollTop <= clientHeight + 50) {
            setLoading(true);
            setTimeout(() => {
                setLimit((lim: any) => lim + 10);
                setLoading(false);
            }, 500);
        }
    };

    const handleSearchChange = (event: any) => {
        setSearchTerm(event.target.value);
    };

    const handleParentCheckboxChange = (productIndex: any) => {
        const newProducts = displayedProducts.map((product: any, index: number) => {
            if (index === productIndex) {
                const isChecked = !product.checked;
                return {
                    ...product,
                    checked: isChecked,
                    children: product.children.map((child: any) => ({
                        ...child,
                        checked: isChecked
                    }))
                };
            } else {
                return {
                    ...product,
                    checked: false,
                    children: product.children.map((child: any) => ({
                        ...child,
                        checked: false
                    }))
                };
            }
        });

        setDisplayedProducts(newProducts);
        const checkedProducts = newProducts.filter((x: any) => x.checked === true);
        handleCallbackProductList(checkedProducts.length ? checkedProducts : [], id);
    };

    const handleChildCheckboxChange = (productIndex: any, childIndex: any) => {
        const newProducts = displayedProducts.map((product: any, index: any) => {
            if (index === productIndex) {
                const newChildren = product.children.map((child: any, cIndex: any) => {
                    if (cIndex === childIndex) {
                        return { ...child, checked: !child.checked };
                    }
                    return child;
                });
                const isParentChecked = newChildren.some((child: any) => child.checked);
                return {
                    ...product,
                    checked: isParentChecked,
                    children: newChildren
                };
            } else {
                return {
                    ...product,
                    checked: false,
                    children: product.children.map((child: any) => ({
                        ...child,
                        checked: false
                    }))
                };
            }
        });

        setDisplayedProducts(newProducts);
        const checkedProducts = newProducts.filter((x: any) => x.checked === true);
        handleCallbackProductList(checkedProducts.length ? checkedProducts : [], id);
    };

    const handleSave = () => {
        handleCallbackProduct(selectedProductList.length ? selectedProductList.map((sp: any) => sp.name) : 'Select Product', id);
        setOpen(false);
    };

    const filteredProducts = displayedProducts.filter((product: any) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <Grid container xs={12}>
            <Grid item xs={10}>
                <TextField style={{ color: '#000000CC', width: '25vw', justifyContent: 'left', marginTop: 2 }} inputProps={{ style: { height: '0vh', color: '#000000CC' } }} disabled value={selectedProduct} />
            </Grid>
            <Grid item xs={2} sx={{ color: '#00000033', marginTop: 0.3 }}>
                <IconButton aria-label='create' onClick={() => setOpen(true)} size="small">
                    <CreateIcon style={{ color: '#00000033' }} />
                </IconButton>
            </Grid>
            {
                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    PaperProps={{
                        style: { width: '80%', maxWidth: 'none' }
                    }}
                >
                    <DialogTitle>Select Products</DialogTitle>
                    <Divider />
                    <TextField
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        margin="dense"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'green',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'green',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: 'green',
                                },
                            },
                        }}
                        style={{
                            paddingTop: 10,
                            paddingBottom: 10,
                            paddingLeft: 20,
                            paddingRight: 20
                        }}
                    />

                    <Box
                        sx={{
                            overflowY: 'auto',
                            maxHeight: '60vh',
                            padding: '0 16px',
                            marginBottom: '16px',
                            textAlign: 'center',
                            minHeight: '20vh',
                            alignContent: 'center'
                        }}
                        ref={containerRef}
                        onScroll={handleScroll}
                    >
                        <List>
                            {filteredProducts.map((product: any, productIndex: any) => (
                                <React.Fragment key={product.id}>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Checkbox
                                                checked={product.checked || false}
                                                onChange={() => { handleParentCheckboxChange(productIndex) }}
                                            />
                                        </ListItemIcon>
                                        <ListItemAvatar>
                                            <Avatar src={product.image} />
                                        </ListItemAvatar>
                                        <ListItemText primary={product.name} />
                                    </ListItem>
                                    <Divider />
                                    {product.children.map((child: any, childIndex: any) => (
                                        <Grid container xs={12} key={child.id}>
                                            <Grid item xs={12}>
                                                <ListItem style={{ paddingLeft: '2em' }}>
                                                    <ListItemIcon>
                                                        <Checkbox
                                                            checked={child.checked || false}
                                                            onChange={() => handleChildCheckboxChange(productIndex, childIndex)}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText primary={child.name} />
                                                    <ListItem style={{ width: '20vw' }}>
                                                        <ListItemText primary={`${child.inventory_quantity && child.inventory_quantity > 0 ? child.inventory_quantity : 'not'} available`} />
                                                        <ListItemText primary={`$${child.price}`} />
                                                    </ListItem>
                                                </ListItem>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Divider />
                                            </Grid>
                                        </Grid>
                                    ))}
                                </React.Fragment>
                            ))}
                        </List>
                        {loading && <CircularProgress />}
                    </Box>
                    <Divider />
                    <Box display="flex" justifyContent="space-between" alignItems="center" padding="16px">
                        <Typography variant="body2">
                            {getSelectedProductCount()} product{getSelectedProductCount() !== 1 ? 's' : ''} selected
                        </Typography>
                        <DialogActions>
                            <Button onClick={() => setOpen(false)} style={{ color: '#008060', borderColor: '#008060' }} variant="outlined">Cancel</Button>
                            <Button onClick={handleSave} variant="contained" style={{ background: "#008060" }}>Save</Button>
                        </DialogActions>
                    </Box>
                </Dialog>
            }
        </Grid>
    )
}

export default SelectProduct;
