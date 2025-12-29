import { memo, useState } from 'react';
import CategoryTable from '../Components/Category/CategoryTable';
import SubCategoriesTable from '../Components/Category/SubCategoriesTable';




const CategoryManagment = () => {


    return (
        <div className="p-6 bg-white min-h-screen rounded-[40px]  border border-[#B2B2B2]">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <div className='flex flex-col justify-center lg:items-start items-center'>
                    <h1 className="text-2xl font-semibold">Categories Management</h1>
                    <p className="text-gray-500 text-center text-sm">
                        Organize machines into categories and subcategories
                    </p>
                </div>
            </div>
            <div className='flex flex-col gap-10'>
                {/* CategoryTable */}
                <CategoryTable />

                {/* Subcategory Table */}
                <SubCategoriesTable />
            </div>
        </div>
    );
};

export default memo(CategoryManagment);