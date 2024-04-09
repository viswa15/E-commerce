import categoryModel from "../models/categoryModel.js"
import slugify from 'slugify'

//create category
export const createCategoryController = async(req,res) =>{
    try{
        const {name} = req.body
        if(!name){
            return res.status(404).send({message:"Name is Required"})
        }
        const existingCategory = await categoryModel.findOne({name})
        if(existingCategory){
            return res.status(200).send({
                success : true,
                message : "Category Already Exists"     
            })
        }
        const category = await new categoryModel({name,slug:slugify(name)}).save()
        res.status(201).send({
            success: true,
            message : "New Category created",
            category
        })
    }catch(e){
        console.log(e)
        res.status(500).send({
            success : false,
            message : "errror in category",
            e
        })
    }
}

//update category
export const updateCategoryController = async(req,res) => {
    try{
        const {name} = req.body
        const {id} = req.params
        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message : "Category updated successfully",
            category
        })
    }catch(e){
        console.log(e)
        res.status(500).send({
            success : false,
            message : "Error while updating category",
            e
        })
    }
}

//get all categories
export const categoryController = async(req,res) =>{
    try{
        const category = await categoryModel.find({})
        res.status(200).send({
            success : true,
            message : "All Categories List",
            category
        })
    }catch(e){
        console.log(e)
        res.status(500).send({
            success : false,
            message : "Error while getting categories",
            e
        })
    }
}

//get single category
export const singleCategoryController = async(req,res) =>{
    try{
        const category = await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success : true,
            message : "Get Single category successful",
            category
        })
    }catch(e){
        console.log(e)
        res.status(500).send({
            success : false,
            message : "Error occured during getting category",
            e
        })
    }
}

export const deleteCategoryController = async(req,res) =>{
    try{
        const {id} = req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success : true,
            message : "Cateogry Deleted Successfully",
        })
    }catch(e){
        console.log(e)
        res.status(500).send({
            success : false,
            message : "Error while deleting category",
            e
        })
    }
}
