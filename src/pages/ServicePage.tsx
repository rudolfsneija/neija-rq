export function ServicePage() {
  return (
    <div className="py-12 pb-48">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="text-4xl font-bold">Professional ATV Service</h1>
        <p className="mt-4 text-lg text-gray-600">
          Expert maintenance and repair services for your racing quad.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Shop Images */}
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/images/other/garaza3_D.jpeg"
              alt="Service Shop"
              className="rounded-lg object-cover"
            />
            <img
              src="/images/other/amisi_D.jpeg"
              alt="Service Shop"
              className="rounded-lg object-cover"
            />
            <img
              src="/images/other/engine_D.jpeg"
              alt="Service Shop"
              className="rounded-lg object-cover"
            />
            <img
              src="/images/other/garaza2_D_square.jpeg"
              alt="Service Shop"
              className="rounded-lg object-cover"
            />
          </div>

          {/* Service Information */}
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold">SUSPENSION</h2>
              <p className="mt-4 text-gray-600">
                Suspension maintenance and repair. Any suspension brand, including TFX, PEP, KYB,
                Reiger, elka, fox, ohlins, wp, custom axxis, etc. Regular maintenance, repair,
                adjustment to rider needs. We source the parts ourselves.
              </p>
            </section>

            <section>
                <h2 className="text-2xl font-bold">ENGINES</h2>
              <p className="mt-4 text-gray-600">
                Engine maintenance and repair. Specialising in motocross bikes and quads.
                Regular maintenance, repair, adjustment to rider needs. Same as suspension,
                we supply all the necessary parts.
              </p>
            </section>

            <div className="rounded-lg bg-yellow-50 p-6">
              <h3 className="text-xl font-semibold text-yellow-900">Want to Book Service?</h3>
              <p className="mt-2 text-yellow-700">
                Contact us to schedule your service appointment or discuss your specific needs.
              </p>
              <a
                href="/contact"
                className="mt-4 inline-block rounded-lg bg-yellow-500 px-4 py-2 text-white transition hover:bg-yellow-600"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}