import questions from "../js/faq";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import "../styles/Faq.css";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className=" mt-4 bg-light p-4 rounded ">
      <p className="text-center text-black text-opacity-75">Find them here.</p>
      <h2 className="text-dark text-center text-sm ">
        You have questions?{" "}
        <span className="text-underline text-success opacity-75">
          Find them here.
        </span>{" "}
      </h2>
      {questions.map((item, index) => {
        const open = openIndex === index;
        return (
          <div key={index} className="p-2 mb-1">
            <div
              className="d-flex align-items-center justify-content-between text-muted text-sm text-underline"
              onClick={() => toggleAnswer(index)}
              style={{ cursor: "pointer" }}
            >
              <p className="text-muted mb-0">{item.question}</p>
              <IoIosArrowDown
                className={`faq-arrow ${open ? "open" : ""} text-muted`}
                style={{ transition: "transform 200ms" }}
                aria-hidden="true"
              />
            </div>
            <div className={`faq-answer ${open ? "open" : ""} `}>
              <p className="text-black">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FAQ;
