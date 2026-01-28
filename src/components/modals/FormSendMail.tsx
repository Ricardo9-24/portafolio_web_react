import React, { useState } from "react";
// import type { DataMail } from "../../types.tsx"
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import type { EmailJSResponseStatus } from "@emailjs/browser";

declare global {
    interface Window {
        emailjs: typeof emailjs;
    }
}
interface FormData {
    name: string,
    email: string,
    subject: string,
    message: string
}
type Props = {
    onCancel: () => void;
    // dataMail: DataMail[] | null  
}

const FormSendMail = ({ onCancel }: Props) => {
    const [data, setData] = useState<FormData>({
        name: '', email: '', subject: '', message: ''
    });
    const form = useRef<HTMLFormElement>(null);
    const MySwal = withReactContent(Swal);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        console.log(name + value);
        setData({ ...data, [name]: value })
        console.log(data)
    }
    // const validateInputs = Object.values({ name: '', email: '', subject: '', message: '' }).every(
    //     (value) => value != null && value != ''
    // );
    const sendMail = (e: React.FormEvent) => {
        console.log(e);
        e.preventDefault()
        console.log(data)
        const isValid = Object.values(data).every((value) => value != null && value != '');
        if (isValid) {
            console.log("Todo OK")
            emailjs
                .sendForm('service_89xfixe', 'template_lvy3y1c', form.current, {
                    publicKey: 'b6pmdziO3KxT1Nomy',
                })
                .then(() => {
                    console.log("resp");
                    MySwal.fire({
                        icon: "success",
                        title: "Mensaje de prueba",
                        draggable: true,
                        theme: "dark"
                    })
                }, (error: EmailJSResponseStatus) => {
                    console.log(error);
                });
        } else {
            console.log("valida los campos")
            MySwal.fire({
                icon: 'warning',
                title: 'Completa todos los campos',
                draggable: true,
                theme: 'dark'
            })
        }
    }
    return (
        <>
            <div className="modal">
                <div className="modal-content">
                    <h2 className="text-center">Enviar un mensaje ahora</h2>
                    <form className="my-3" ref={form} onSubmit={sendMail}>
                        <div className="mb-3">
                            <label className="form-label">Nombre *</label>
                            <input className="form-control" name="name" onChange={handleChange} />
                            {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email *</label>
                            <input className="form-control" name="email" onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Asunto *</label>
                            <input className="form-control" name="subject" onChange={handleChange} />

                        </div>
                        <div className="mb-3">
                            <label className="form-label">Mensaje *</label>
                            <textarea className="form-control" name="message" onChange={handleChange} rows={4}></textarea>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <button className="btn btn-outline-dark" onClick={onCancel}>Cancelar</button>
                            </div>
                            <div className="col-md-6 ">
                                <button type="submit" className="btn btn-dark btnSendMail">Enviar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default FormSendMail;