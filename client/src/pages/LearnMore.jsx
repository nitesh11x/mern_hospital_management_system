import React from "react";

const LearnMore = () => {
  return (
    <section className="min-h-screen md:mt-12 bg-gradient-to-r from-purple-50 to-purple-100 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-purple-800 mb-6 text-center">
          About Nice Hospital
        </h1>

        {/* Content */}
        <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
          <p>
            Welcome to <span className="font-semibold">Nice Hospital</span>, a trusted
            name in healthcare and a beacon of hope for patients across our region.
            Since our establishment in <span className="font-semibold">2001</span>, we
            have been dedicated to providing quality medical services with a unique
            blend of compassion, professionalism, and innovation. For more than two
            decades, our hospital has been at the heart of the community, striving
            every single day to improve the health and well-being of the people we
            serve.
          </p>

          <p>
            What sets us apart is not just the advanced facilities we offer, but the
            values we uphold. At Nice Hospital, our mission is simple yet powerful:{" "}
            <em>“To deliver affordable, reliable, and world-class healthcare while
            treating every patient like family.”</em> This guiding philosophy has
            shaped our growth and inspired us to keep improving with every passing
            year.
          </p>

          {/* Establishment */}
          <h2 className="text-2xl font-semibold text-purple-700 mt-6">
            🏥 Our Establishment and Growth
          </h2>
          <p>
            Founded at the turn of the new millennium, Nice Hospital began as a small
            healthcare center with just a handful of doctors and a single ward. Over
            time, the hospital grew in both reputation and capacity, responding to
            the growing needs of our community. Today, we stand tall as a
            multi-specialty hospital with modern infrastructure, advanced technology,
            and a strong team of dedicated professionals.
          </p>
          <p>
            Our facilities now include specialized departments in{" "}
            <strong>Cardiology, Radiology, Neurology, Pediatrics, Psychiatry,
            Orthopedics, Dermatology, and General Medicine</strong>. We have
            invested heavily in diagnostic tools, critical care units, surgical
            theaters, and patient-centered spaces designed for comfort and safety. As
            healthcare needs evolved, so did we, ensuring that patients never had to
            leave the city in search of quality medical care.
          </p>

          {/* Staff */}
          <h2 className="text-2xl font-semibold text-purple-700 mt-6">
            👩‍⚕️ Our Dedicated Staff
          </h2>
          <p>
            At the heart of Nice Hospital is our incredible team of doctors, nurses,
            and healthcare professionals. Our staff members are not only highly
            qualified but also deeply compassionate individuals who believe in
            healing beyond medicine. Each member of our team goes the extra mile to
            ensure patients feel cared for, understood, and supported throughout
            their journey.
          </p>
          <p>
            Our doctors come from diverse specialties and bring a wealth of
            experience from reputed medical institutions. Our nurses, often described
            as the soul of the hospital, provide round-the-clock care with
            dedication, empathy, and professionalism. The administrative staff works
            tirelessly behind the scenes to make sure the hospital runs smoothly and
            patients get the attention they deserve. Together, we form a family
            united by one goal: <strong>better health for all</strong>.
          </p>

          {/* Patients */}
          <h2 className="text-2xl font-semibold text-purple-700 mt-6">
            ❤️ Our Patients and Community
          </h2>
          <p>
            Over the years, we have had the privilege of serving thousands of
            patients from all walks of life. Each patient who walks through our doors
            is treated with dignity, respect, and compassion. We strongly believe
            that healthcare is not just about treating illnesses but also about
            building trust, offering hope, and restoring confidence in life.
          </p>
          <p>
            Many of our patients come back to us not just for medical treatment but
            because they see us as part of their extended family. From children
            receiving their first vaccinations to elderly patients getting regular
            check-ups, we have been with families through generations, creating
            bonds that go beyond the hospital walls.
          </p>

          {/* Facilities */}
          <h2 className="text-2xl font-semibold text-purple-700 mt-6">
            ⚙️ Advanced Facilities and Technology
          </h2>
          <p>
            Nice Hospital is equipped with the latest in medical technology. Our
            radiology unit features modern imaging machines for accurate diagnosis,
            while our cardiology department is equipped with state-of-the-art
            monitoring and treatment equipment. We have specialized operation
            theaters designed for complex surgeries and intensive care units for
            patients who need critical support.
          </p>
          <p>
            In addition to medical technology, we also focus on patient experience.
            Comfortable wards, clean surroundings, and a warm atmosphere ensure that
            patients feel safe and cared for. We understand that healing requires
            both physical and emotional well-being, which is why we have integrated
            holistic care into our services.
          </p>

          {/* Achievements */}
          <h2 className="text-2xl font-semibold text-purple-700 mt-6">
            🌟 Our Achievements and Recognition
          </h2>
          <p>
            Over the past two decades, Nice Hospital has earned numerous accolades
            and the trust of our community. We have been recognized for excellence in
            patient care, innovation in healthcare delivery, and our contribution to
            public health awareness. But for us, the greatest reward is seeing our
            patients recover, smile, and return to their normal lives.
          </p>
          <p>
            Several of our doctors have been honored for their contributions to
            medical science, and our hospital has been a hub for training young
            healthcare professionals. We regularly conduct health camps, awareness
            programs, and free check-up drives to ensure that healthcare reaches even
            the underserved sections of society.
          </p>

          {/* Vision */}
          <h2 className="text-2xl font-semibold text-purple-700 mt-6">
            🌍 Our Vision for the Future
          </h2>
          <p>
            As we look to the future, our vision is to continue expanding our
            services, embrace innovation, and make healthcare accessible to
            everyone—regardless of background or income. We are working toward
            introducing telemedicine services, digital patient records, and advanced
            treatment methods so that our patients receive the best care at the
            right time.
          </p>
          <p>
            With the world of healthcare rapidly evolving, we are committed to being
            at the forefront of change. Whether it’s adopting AI-powered diagnostic
            tools, improving patient engagement systems, or expanding specialized
            departments, Nice Hospital will remain a leader in modern, patient-first
            healthcare.
          </p>

          {/* Closing */}
          <p className="mt-8 font-medium text-purple-800 text-lg">
            At Nice Hospital, we believe that good health is the foundation of a
            happy life. With our dedicated staff, advanced facilities, and unwavering
            commitment to patients, we are proud to be more than just a hospital—
            we are a trusted partner in health and healing.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LearnMore;
