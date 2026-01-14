import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Enviar para o Formspree
    const formspreeUrl = "https://formspree.io/f/xqapnorp";
    const formData = {
      name: name,
      email: email,
      subject: subject,
      message: message,
    };

    try {
      await fetch(formspreeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("Message sent to Formspree!");
      alert("Your message has been sent successfully!");
    } catch (error) {
      console.error("Error sending to Formspree:", error);
      alert("There was an error sending your message. Please try again later.");
    }
  };
  return (
    // <!-- Contact Section -->
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-2 text-3xl font-bold md:text-4xl">
            {t("contact.title")}{" "}
            <span className="gradient-text">{t("contact.subtitle")}</span>
          </h2>
          <div className="from-pink to-purple mx-auto h-1 w-24 bg-gradient-to-r"></div>
          <p className="mx-auto mt-4 max-w-2xl">
            {t("contact.description")}
          </p>
        </div>

        <div className="mx-auto flex max-w-5xl flex-col gap-10 md:flex-row">
          <div className="md:w-2/5">
            <div className="card rounded-xl p-8">
              <h3 className="title mb-6 text-2xl font-semibold">
                {t("contact.info")}
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-pink/20 mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                    <i className="fas fa-envelope text-pink"></i>
                  </div>
                  <div>
                    <h4 className="mb-1 font-medium">{t("contact.email")}</h4>
                    <a
                      href="mailto:clara.cayres1205@gmail.com"
                      className="hover:text-pink w-full break-all text-gray-400 transition-colors"
                    >
                      clara.cayres1205@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-pink/20 mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                    <i className="fas fa-map-marker-alt text-pink"></i>
                  </div>
                  <div>
                    <h4 className="mb-1 font-medium">
                      {t("contact.location")}
                    </h4>
                    <p className="text-gray-400">
                      {t("contact.locationDescription")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="mb-4 font-medium">{t("contact.social")}</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://www.linkedin.com/in/maria-clara-cayres-de-almeida"
                    target="blank"
                    className="bg-pink/20 hover:bg-pink/40 flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                  >
                    <i className="fab fa-linkedin-in text-pink"></i>
                  </a>
                  <a
                    href="https://github.com/claracayres"
                    target="blank"
                    className="bg-purple/20 hover:bg-purple/40 flex h-10 w-10 items-center justify-center rounded-full transition-colors"
                  >
                    <i className="fab fa-github text-purple"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-3/5">
            <div className="card rounded-xl p-8">
              <h3 className="title mb-6 text-2xl font-semibold">
                {t("contact.form.title")}
              </h3>

              <form
                id="contact-form"
                className="space-y-6"
                onSubmit={handleFormSubmit}
              >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm">
                      {t("contact.form.name")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="text bg  border-purple/30 focus:border-pink w-full rounded-lg border bg-white px-4 py-3 text-gray-900 transition-colors focus:outline-none dark:text-white"
                      placeholder={t("contact.form.namePlaceholder")}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm">
                      {t("contact.form.email")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="text bg border-purple/30 focus:border-pink w-full rounded-lg border bg-white px-4 py-3 text-gray-900 transition-colors focus:outline-none dark:text-white"
                      placeholder={t("contact.form.emailPlaceholder")}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="mb-2 block text-sm">
                    {t("contact.form.subject")}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="text bg border-purple/30 focus:border-pink w-full rounded-lg border bg-white px-4 py-3 text-gray-900 transition-colors focus:outline-none dark:text-white"
                    placeholder={t("contact.form.subjectPlaceholder")}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm">
                    {t("contact.form.message")}
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    className="text bg border-purple/30 focus:border-pink w-full rounded-lg border bg-white px-4 py-3 text-gray-900 transition-colors focus:outline-none dark:text-white"
                    placeholder={t("contact.form.messagePlaceholder")}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-gradient shadow-pink/20 w-full rounded-full px-8 py-3 font-medium shadow-lg transition-opacity hover:opacity-90 md:w-auto"
                >
                  {t("contact.form.send")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
