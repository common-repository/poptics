/**
 * WordPress Dependencies
 */

import { inputTypesValue } from "./constant";

const InputInterface = ({ attributes }) => {
    const {
        name,
        isRequired,
        titleColor,
        borderWidth,
        placeholder,
        label,
        type,
        layout = "column",
        help,
        align,
        radioItems,
        radioCheckedItemId,
        justify,
    } = attributes;

    return (
        <>
            {type !== inputTypesValue.radio ? (
                <div
                    className="pt-form-item-container"
                    style={{
                        flexDirection: layout || "column",
                        alignItems: align || "start",
                        justifyContent: justify || "left",
                    }}
                >
                    <label
                        style={{
                            color: titleColor,
                        }}
                    >
                        {label}
                    </label>
                    <input
                        {...(isRequired && { required: true })}
                        type={type}
                        placeholder={placeholder}
                        style={{
                            color: titleColor,
                            borderWidth,
                        }}
                        name={name}
                    />
                </div>
            ) : (
                <div className="pt-custom-radio-component">
                    <label
                        className="pt-custom-radio-label"
                        style={{
                            color: titleColor,
                        }}
                    >
                        {label}
                    </label>
                    <div
                        className="pt-custom-radio-group-container"
                        style={{
                            flexDirection: layout,
                            alignItems: align,
                            justifyContent: justify || "left",
                        }}
                    >
                        {radioItems.map((item) => {
                            return (
                                <div className="pt-custom-radio-item-container">
                                    <input
                                        {...(isRequired && { required: true })}
                                        checked={item.id === radioCheckedItemId}
                                        type="radio"
                                        value={item.value}
                                        name={name}
                                    />
                                    <label>{item.label}</label>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
};

export default InputInterface;
