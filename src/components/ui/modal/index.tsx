import {showClass,hideClass,modalSectionClass, closeButtonClass} from "./styles"
interface ModalProps {
  handleClose?:()=>void,
  show:boolean,
  children:any
}

const Modal= (props: ModalProps) => {
    const {handleClose,show=true,children } = props
    const modalContainerClass=show?showClass:hideClass
    return (
        <div className={modalContainerClass+"w-full h-full"}>
            <section className={modalSectionClass}>
                {children}
                {handleClose && <button className={closeButtonClass} onClick={handleClose}>Close</button>}
            </section>
        </div>
    )
}

export default Modal;
