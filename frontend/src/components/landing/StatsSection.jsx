const stats = [
    {
        number: "500+",
        label: "Farmers Onboarded",
    },
    {
        number: "1200+",
        label: "Produce Listings",
    },
    {
        number: "8+",
        label: "States Connected",
    },
    {
        number: "95%",
        label: "Direct Trade Success",
    },
];

export default function StatsSection() {
    return (
        <section className="bg-white px-6 py-20">

            <div className="mx-auto grid max-w-7xl gap-10 rounded-3xl border border-[var(--color-border)] bg-[var(--color-primary-dark)] px-8 py-16 text-center shadow-lg md:grid-cols-4">

                {stats.map((stat, index) => (
                    <div key={index}>

                        <h3 className="mb-2 font-['Sora'] text-4xl font-bold text-white">
                            {stat.number}
                        </h3>

                        <p className="text-green-100">
                            {stat.label}
                        </p>

                    </div>
                ))}

            </div>
        </section>
    );
}