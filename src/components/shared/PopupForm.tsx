/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Formik, Form } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Icon } from "@iconify/react";
import { Eye, Pencil, Plus } from "lucide-react";
import { Fields } from "@/types/fields";
import { PopupFormProps } from "@/types/popupform";
import useValidationSchema from "@/hooks/useValidationSchema";

const PopupForm: React.FC<PopupFormProps> = ({
    isOpen,
    onClose,
    onSubmit,
    fields,
    title,
    initialData,
    mode = "add",
    onEdit = null,
}) => {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const validationSchema = useValidationSchema(title?.split(" ").pop() || "");

    useEffect(() => {
        if (!isOpen) {
            setFormData({});
        }
    }, [isOpen]);

    useEffect(() => {
        if (initialData && (mode === "edit" || mode === "view") && isOpen) {
            setFormData(initialData);
        }
    }, [initialData, mode, isOpen]);

    // Handle local state changes
    const handleLocalStateChange = (fieldName: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    };

    const renderField = (field: Fields, formik: any) => {
        const {
            name,
            label,
            type = "text",
            options = [],
            required = false,
            placeholder = "",
            icon,
            render = null,
            multiple = false, // Add multiple option
        } = field;

        const isViewMode = mode === "view";
        const hasError = formik.touched[name] && formik.errors[name];

        // View mode with custom render function
        if (isViewMode && render) {
            return (
                <div className="grid gap-2" key={name}>
                    <Label className="text-sm font-medium">{label}</Label>
                    <div className="text-sm">
                        {render(
                            formData[name] || formik.values[name],
                            formData
                        )}
                    </div>
                </div>
            );
        }

        switch (type) {
            case "select":
                if (isViewMode) {
                    const selectedOption = options.find(
                        (opt) =>
                            opt.value ===
                            (formData[name] || formik.values[name])
                    );
                    return (
                        <div className="grid gap-2" key={name}>
                            <Label className="text-sm font-medium">
                                {label}
                            </Label>
                            <div className="text-sm py-2">
                                {selectedOption?.label || "-"}
                            </div>
                        </div>
                    );
                }
                return (
                    <div className="grid gap-2" key={name}>
                        <Label htmlFor={name}>
                            {label}
                            {required && (
                                <span className="text-red-500">*</span>
                            )}
                        </Label>
                        <Select
                            onValueChange={(value) => {
                                formik.setFieldValue(name, value);
                                handleLocalStateChange(name, value);
                            }}
                            value={formik.values[name] || ""}
                            onOpenChange={() =>
                                formik.setFieldTouched(name, true)
                            }
                        >
                            <SelectTrigger
                                className={hasError ? "border-red-500" : ""}
                            >
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                                {options.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {hasError && (
                            <div className="text-sm text-red-500">
                                {formik.errors[name]}
                            </div>
                        )}
                    </div>
                );

            case "date":
                if (isViewMode) {
                    const value = formData[name] || formik.values[name];
                    return (
                        <div className="grid gap-2" key={name}>
                            <Label className="text-sm font-medium">
                                {label}
                            </Label>
                            <div className="text-sm py-2">
                                {value
                                    ? new Date(value).toLocaleDateString()
                                    : "-"}
                            </div>
                        </div>
                    );
                }
                return (
                    <div className="grid gap-2" key={name}>
                        <Label htmlFor={name}>
                            {label}
                            {required && (
                                <span className="text-red-500">*</span>
                            )}
                        </Label>
                        <Input
                            id={name}
                            type="date"
                            {...formik.getFieldProps(name)}
                            onChange={(e) => {
                                formik.handleChange(e);
                                handleLocalStateChange(name, e.target.value);
                            }}
                            className={hasError ? "border-red-500" : ""}
                        />
                        {hasError && (
                            <div className="text-sm text-red-500">
                                {formik.errors[name]}
                            </div>
                        )}
                    </div>
                );
           
            case "file":
                if (isViewMode) {
                    const value = formData[name] || formik.values[name]
                    const renderFileLinks = (
                        files: File[] | string[] | File | string
                    ) => {
                       
                        if (!files) return "-";

                        
                        const fileArray = Array.isArray(files)
                            ? files
                            : [files];

                        
                        if (fileArray.length === 0) return "-";

                        return fileArray.map((file, index) => {
                            
                            if (typeof file === "string") {
                                return (
                                    <a
                                        key={index}
                                        href={file}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block"
                                    >
                                        {file}
                                    </a>
                                );
                            }
                            // If it's a File object, render filename
                            return (
                                <div key={index} className="block">
                                    {file.name}
                                </div>
                            );
                        });
                    };
                    return (
                        <div className="grid gap-2" key={name}>
                            <Label className="text-sm font-medium">
                                {label}
                            </Label>
                            <div className="text-sm py-2">
                                {renderFileLinks(value)}
                            </div>
                        </div>
                    );
                }
                return (
                    <div className="grid gap-2" key={name}>
                        <Label htmlFor={name}>
                            {label}
                            {required && (
                                <span className="text-red-500">*</span>
                            )}
                        </Label>
                        <Input
                            id={name}
                            type="file"
                            multiple={multiple} 
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                const files = e.target.files;
                                if (files) {
                                    
                                    const processedFiles = multiple
                                        ? Array.from(files)
                                        : files[0]
                                        ? [files[0]]
                                        : [];

                                    
                                    formik.setFieldValue(name, processedFiles);
                                    handleLocalStateChange(
                                        name,
                                        processedFiles
                                    );
                                }
                            }}
                            className={hasError ? "border-red-500" : ""}
                        />
                        {hasError && (
                            <div className="text-sm text-red-500">
                                {formik.errors[name]}
                            </div>
                        )}
                        {multiple && (
                            <div className="text-xs text-gray-500 mt-1">
                                Multiple file upload is enabled
                            </div>
                        )}
                    </div>
                );

            default:
                if (isViewMode) {
                    return (
                        <div className="grid gap-2" key={name}>
                            <Label className="text-sm font-medium">
                                {label}
                            </Label>
                            <div className="text-sm py-2">
                                {formData[name] || formik.values[name] || "-"}
                            </div>
                        </div>
                    );
                }
                return (
                    <div className="grid gap-2" key={name}>
                        <Label htmlFor={name}>
                            {label}
                            {required && (
                                <span className="text-red-500">*</span>
                            )}
                        </Label>
                        <div className="relative">
                            {icon && (
                                <Icon
                                    icon={icon}
                                    className="absolute left-3 top-2.5 text-gray-500"
                                />
                            )}
                            <Input
                                id={name}
                                type={type}
                                placeholder={placeholder}
                                {...formik.getFieldProps(name)}
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    handleLocalStateChange(
                                        name,
                                        e.target.value
                                    );
                                }}
                                className={`${icon ? "pl-10" : ""} ${
                                    hasError ? "border-red-500" : ""
                                }`}
                            />
                        </div>
                        {hasError && (
                            <div className="text-sm text-red-500">
                                {formik.errors[name]}
                            </div>
                        )}
                    </div>
                );
        }
    };

    const renderIcon = () => {
        switch (mode) {
            case "edit":
                return <Pencil className="h-4 w-4" />;
            case "view":
                return <Eye className="h-4 w-4" />;
            default:
                return <Plus className="h-4 w-4" />;
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md max-h-[90vh] flex flex-col">
                <DialogHeader className="flex flex-row items-center gap-2 shrink-0">
                    {renderIcon()}
                    <DialogTitle>
                        {mode === "edit"
                            ? ` ${title}`
                            : mode === "view"
                            ? `View ${title}`
                            : title}
                    </DialogTitle>
                </DialogHeader>
                <div className="overflow-y-auto grow pr-2">
                    <Formik
                        initialValues={initialData || {}}
                        validationSchema={validationSchema}
                        onSubmit={(values, { resetForm }) => {
                            onSubmit(values, mode as "add" | "edit");
                            resetForm();
                            setFormData({});
                            onClose();
                        }}
                        enableReinitialize
                    >
                        {(formik) => (
                            <Form className="space-y-4">
                                {fields.map((field) =>
                                    renderField(field, formik)
                                )}
                            </Form>
                        )}
                    </Formik>
                </div>
                <DialogFooter className="shrink-0">
                    <Formik
                        initialValues={initialData || {}}
                        validationSchema={validationSchema}
                        onSubmit={(values, { resetForm }) => {
                            onSubmit(values, mode as "add" | "edit");
                            resetForm();
                            setFormData({});
                            onClose();
                        }}
                        enableReinitialize
                    >
                        {(formik) => (
                            <Form className="w-full">
                                {mode === "view" && onEdit && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => onEdit(formData)}
                                    >
                                        <Pencil className="h-4 w-4 mr-2" />
                                        Edit
                                    </Button>
                                )}
                                {mode !== "view" && (
                                    <>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => {
                                                formik.resetForm();
                                                setFormData({});
                                                onClose();
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                        className="ml-2"
                                            type="submit"
                                        
                                        >
                                            {mode === "edit"
                                                ? "Update"
                                                : "Save"}
                                        </Button>
                                    </>
                                )}
                                {mode === "view" && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={onClose}
                                    >
                                        Close
                                    </Button>
                                )}
                            </Form>
                        )}
                    </Formik>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default PopupForm;
