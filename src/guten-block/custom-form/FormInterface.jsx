const FormInterface = ({ attributes, children }) => {
    const { formStyle } = attributes;
    return (
        <div id="popticsFormContainer">
            <form style={formStyle} id="popticsForm">
                {children}
            </form>
        </div>
    );
};

export default FormInterface;
