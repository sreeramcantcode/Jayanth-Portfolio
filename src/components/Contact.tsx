import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PaperPlaneTilt, LinkedinLogo, Envelope, Phone, MapPin } from "@phosphor-icons/react";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current?.children || [], {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
      });

      gsap.from(formRef.current?.children || [], {
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
        },
      });

      gsap.from(infoRef.current?.children || [], {
        x: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const button = e.currentTarget.querySelector("button[type='submit']");

    if (button) {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
      });
    }

    try {
      await emailjs.send(
        "service_btklnrr",
        "template_smvv5d6",
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        "PWOXDCU4UuCWWXQTS"
      );

      alert("Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Email failed:", error);
      alert("Failed to send message.");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 px-6 relative overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            Get In <span className="text-primary-glow">Touch</span>
          </h2>

          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-6" />

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a product idea in mind or just want to connect? Feel free to
            drop a message — always open to a meaningful conversation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* FORM */}
          <div ref={formRef} className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-foreground mb-2 font-medium">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-input glass border border-border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-foreground mb-2 font-medium">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 bg-input glass border border-border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-foreground mb-2 font-medium">
                  Message
                </label>

                <textarea
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 bg-input glass border border-border rounded-lg resize-none"
                />
              </div>

              <button
                type="submit"
                className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-primary text-primary-foreground rounded-lg font-medium hover:shadow-glow-primary transition-all duration-300 hover:scale-105"
              >
                Send Message
                <PaperPlaneTilt size={20} />
              </button>
            </form>
          </div>

          {/* CONTACT INFO */}
          <div ref={infoRef} className="space-y-8">
            <div>
              <h3 className="text-2xl font-light text-foreground mb-6">
                Let's Connect
              </h3>

              <p className="text-muted-foreground leading-relaxed">
                I’m always interested in thoughtful product conversations and
                new opportunities to collaborate.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 glass rounded-lg">
                <Envelope size={20} />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">
                    jayanthallumolu@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 glass rounded-lg">
                <Phone size={20} />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground">
                    +91 7207815313
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 glass rounded-lg">
                <MapPin size={20} />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-muted-foreground">
                    Hyderabad, India
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Follow Me</h4>

              <a
                target="_blank"
                href="https://www.linkedin.com/in/asaijayanth"
                className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center hover:scale-110 transition"
              >
                <LinkedinLogo size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;