import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import "../styles/Contacts.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      try {
        emailjs.init(publicKey);
      } catch (error) {
        throw new Error("Failed to initialize EmailJS: " + error.message);
      }
    }
  }, []);

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    const name = formData.get("name") || "".toString().trim();
    const email = formData.get("email") || "".toString().trim();
    const phone = formData.get("phone") || "".toString().trim();
    const message = formData.get("message") || "".toString().trim();

    //Template email

    const subject = `From ${name || "client"} `;

    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Message: ${message}`,
    ];
    const mailToHref = `mailto:doncho8884@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

    if (serviceId && templateId) {
      setStatus("sending");
      try {
        await emailjs.send(serviceId, templateId, {
          from_name: name,
          from_email: email,
          from_phone: phone,
          from_message: message,
          to_email: "doncho8884@gmail.com",
        });
        setStatus("sent");
        formEl.reset();
      } catch (error) {
        throw new Error("Failed to send email: " + error.message);
      }
    } else {
      formEl.reset();
      window.location.href = mailToHref;
    }
  };
  return (
    <div className="d-flex flex-column align-items-center bg-light min-vh-100">
      <h1 className="">Contact Us</h1>
      <p>We'd Love to hear from you</p>
      <div className="d-flex flex-column flex-lg-row mt-3 gap-5">
        <div className="card p-3 bg-light shadow-lg border-0">
          <h3 className="justify-content-center d-flex ">Send us a Message</h3>
          <p className="justify-content-center d-flex">
            Please fill out the form below to get in touch with us.
          </p>
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-5">
            <div className="d-flex flex-column ">
              <label htmlFor="name" className="mt-3">
                Name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={form.name}
                onChange={onChange}
                className="p-2 border rounded-1"
                required
              />
              <label htmlFor="email" className="mt-3">
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={onChange}
                className="p-2 border rounded-1"
                required
              />
              <label htmlFor="phone" className="mt-3">
                Phone:
              </label>
              <input
                type="telephone"
                name="phone"
                id="phone"
                value={form.phone}
                onChange={onChange}
                className="p-2 border rounded-1"
                required
              />
            </div>
            <div className="d-flex flex-column col-md-10 ">
              <label htmlFor="message" className="mb-2">
                Message:
              </label>
              <textarea
                name="message"
                id="message"
                value={form.message}
                onChange={onChange}
                className="p-2 border rounded-1"
                required
                style={{ resize: "none" }}
              ></textarea>
            </div>

            <div className="d-flex justify-content-center">
              <button
                className="btn btn-primary px-4 py-2 opacity-80"
                type="submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Send"}
              </button>
              {status === "sent" && (
                <span className="text-success ms-3">Sent successfully!</span>
              )}
              {status === "error" && (
                <span className="text-danger ms-3">
                  An error occurred while sending.
                </span>
              )}
            </div>
          </form>
        </div>
        <div className="d-flex flex-column gap-3 border rounded p-3 shadow-lg bg-white">
          <iframe
            title="Our Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2959.2857438557094!2d24.728339276752592!3d42.12276567121589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14acd03c0a396b7f%3A0xcdba5a55532fa58!2z0LYu0LouINCl0YDQuNGB0YLQviDQkdC-0YLQtdCyIC0g0K7Qs9Cu0LbQtdC9LCDRg9C7LiDigJ7Qk9C10L7RgNCz0Lgg0JjQutC-0L3QvtC80L7QsuKAnCAxLCA0MDA0INCf0LvQvtCy0LTQuNCy!5e0!3m2!1sbg!2sbg!4v1775375140185!5m2!1sbg!2sbg"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="border-1 rounded shadow-lg"
          ></iframe>
          <div className="d-flex flex-column gap-2 p-3">
            <h4 className="">
              Our Location and Contact Information
            </h4>
            <p className="bg-light py-2 px-2 text-center rounded bg-opacity-50 glass-effect">
              Email: doncho8884@gmail.com
            </p>
            <p className="bg-light py-2 px-2 text-center rounded bg-opacity-50 glass-effect">
              Phone: +359 88 688 4507
            </p>
            <p className="bg-light py-2 px-2 text-center rounded bg-opacity-50 glass-effect">
              Address: Plovdiv, Bulgaria
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
