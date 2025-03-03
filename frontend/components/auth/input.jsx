const Input = ({type, className, id, placeholder, change}) => {
    return (
        <>
        <label htmlFor={id} className="form-label"></label>
        {placeholder}
        <input
            type={type}
            className={"form-control"+className }
            id={id}
            placeholder={placeholder}
            onChange={change}
        />
        </>
    )
}

export default Input