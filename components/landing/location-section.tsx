import { MapPin, Clock, Phone, Mail } from "lucide-react";

export function LocationSection() {
  const hours = [
    { day: "Segunda a Sexta", time: "09:00 - 20:00" },
    { day: "Sabado", time: "09:00 - 18:00" },
    { day: "Domingo", time: "Fechado" },
  ];

  return (
    <section id="localizacao" className="py-24 relative">
      <div className="absolute inset-0 urban-texture" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm uppercase tracking-widest">
            Onde estamos
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-4 mb-6">
            NOSSA <span className="text-primary">LOCALIZACAO</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Facil acesso, estacionamento proximo e um ambiente que voce vai
            querer voltar sempre.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map placeholder */}
          <div className="relative aspect-video lg:aspect-auto lg:h-full min-h-75 bg-card border border-border rounded-xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <p className="text-muted-foreground text-sm">
                  Rua das Barbearias, 123
                  <br />
                  Centro - Sao Paulo, SP
                </p>
              </div>
            </div>
            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
              }}
            />
          </div>

          {/* Contact info */}
          <div className="space-y-8">
            {/* Hours */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Horario de Funcionamento</h3>
              </div>
              <div className="space-y-3">
                {hours.map((item) => (
                  <div
                    key={item.day}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <span className="text-muted-foreground">{item.day}</span>
                    <span
                      className={`font-medium ${item.time === "Fechado" ? "text-destructive" : "text-primary"}`}
                    >
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Telefone
                  </span>
                </div>
                <p className="font-bold">(11) 99999-9999</p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Email</span>
                </div>
                <p className="font-bold">contato@fadezone.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
