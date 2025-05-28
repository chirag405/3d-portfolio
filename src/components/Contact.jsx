import React, { useRef, useState, useEffect } from "react";
import SectionWrapper from "../hoc/SectionWrapper";
import { motion } from "framer-motion";
import { slideIn } from "../utils/motion";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import emailjs from "@emailjs/browser";
import { personalInfo, publicUrls } from "../constants";
import Toast from "./ui/toast";
import { useWebGL } from "../utils/WebGLContext";
import { Input } from "./ui/input";

const Contact = () => {
  const formRef = useRef();
  const { ref, shouldRender } = useWebGL("earth");
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Auto-clear toast after 5 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: personalInfo.fullName,
          from_email: form.email,
          to_email: personalInfo.email,
          message: form.message,
          reply_to: form.email,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setToast({
            message: "Thank you! I will get back to you as soon as possible.",
            type: "success",
          });

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          console.log("Error while sending mail ", error);
          setToast({
            message: "Ahh, something went wrong. Please try again.",
            type: "error",
          });
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <>
      {" "}
      <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-6 overflow-hidden">
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="relative flex-[1.4]"
        >          <div className="bg-black-100 p-5 rounded-2xl w-full h-full relative hover:shadow-xl transition-all duration-300 ease-out group">
            <div className="relative w-full h-full group-hover:scale-[1.01] transition-transform duration-300 ease-out">
              <div className="flex items-center justify-end space-x-4 absolute top-8 right-4">
                {Object.keys(publicUrls.socialProfiles).map((socialProfile) => {
                  const profile = publicUrls.socialProfiles[socialProfile];
                  return (
                    <div
                      key={`social_${profile.title}`}
                      onClick={() => window.open(profile.link, "_blank")}
                      className="green-pink-gradient lg:w-10 lg:h-10 h-8 w-8 rounded-full flex justify-center items-center cursor-pointer hover:scale-110"
                    >
                      <img
                        src={profile.icon}
                        alt={`social_${profile.title}`}
                        className="w-4/6 h-4/6 object-contain"
                      />
                    </div>
                  );
                })}              </div>
              <div>
                <p className={styles.sectionSubText}>Get in touch</p>
                <h3 className={styles.sectionHeadText}>Contact.</h3>
              </div>
              <div className="mt-4 w-full">
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="mt-6 flex flex-col gap-4 w-full"
                >
                  {" "}
                  <label className="flex flex-col">
                    <span className="text-white font-medium mb-2">
                      Your Name
                    </span>{" "}
                    <Input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="What's your name?"
                      className="bg-tertiary py-3 px-4 placeholder:text-secondary text-white text-sm rounded-lg outlined-none border-none font-medium h-10 w-full"
                      required
                    />
                  </label>
                  <label className="flex flex-col">
                    <span className="text-white font-medium mb-2">
                      Your Email
                    </span>{" "}
                    <Input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="What's your email?"
                      className="bg-tertiary py-3 px-4 placeholder:text-secondary text-white text-sm rounded-lg outlined-none border-none font-medium h-10 w-full"
                      required
                    />
                  </label>
                  <label className="flex flex-col">
                    <span className="text-white font-medium mb-2">
                      Your Message
                    </span>{" "}
                    <textarea
                      rows={4}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="What do you want to say?"
                      className="bg-tertiary py-3 px-4 placeholder:text-secondary text-white text-sm rounded-lg outlined-none border-none font-medium min-h-[120px] w-full resize-y"
                      required
                    />
                  </label>{" "}
                  <button
                    type="submit"
                    className="bg-tertiary hover:bg-tertiary/80 py-3 px-8 outline-none w-fit text-white text-base font-bold shadow-md shadow-primary rounded-xl transition-all duration-300 ease-in-out border border-electric-purple"
                  >
                    {loading ? "Sending..." : "Send"}
                  </button>                </form>
              </div>
            </div>
          </div>
        </motion.div>{" "}
        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="xl:flex-[0.6] xl:h-auto md:h-[400px] h-[280px]"
        >
          <div ref={ref} className="w-full h-full">
            {shouldRender && <EarthCanvas />}{" "}
          </div>
        </motion.div>
      </div>{" "}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={5000}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default SectionWrapper(Contact, "contact");
