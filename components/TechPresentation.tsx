"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────
// TYPES & CONSTANTS
// ─────────────────────────────────────────────
type Dir = 1 | -1;

const variants = {
  enter: (d: Dir) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: Dir) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
};

const tx = { duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] };

const s = (i: number, base = 0.3) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: base + i * 0.1, duration: 0.45, ease: "easeOut" as const },
});

// ─────────────────────────────────────────────
// SHARED COMPONENTS
// ─────────────────────────────────────────────
function SlideHeader({ tag, title, subtitle }: { tag: string; title: React.ReactNode; subtitle?: string }) {
  return (
    <div className="mb-6 md:mb-8">
      <motion.div {...s(0)} className="inline-flex items-center gap-2 px-3 py-1 rounded-md mb-3 text-xs font-mono font-bold"
        style={{ background: "rgba(30,144,255,0.12)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.2)" }}>
        {tag}
      </motion.div>
      <motion.h2 {...s(1)} className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-2" style={{ color: "#E8F4FD" }}>
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p {...s(2)} className="text-sm md:text-base" style={{ color: "#7B9EC9" }}>{subtitle}</motion.p>
      )}
    </div>
  );
}

function TechBadge({ label, color = "#1E90FF" }: { label: string; color?: string }) {
  return (
    <span className="tech-badge" style={{ borderColor: `${color}40`, color, background: `${color}12` }}>{label}</span>
  );
}

function Bullet({ icon, text, delay, mono = false }: { icon: string; text: string; delay: number; mono?: boolean }) {
  return (
    <motion.div {...s(delay)} className="flex items-start gap-3">
      <span className="text-lg shrink-0 mt-0.5">{icon}</span>
      <p className={`text-sm md:text-base leading-relaxed ${mono ? "font-mono" : ""}`} style={{ color: "#A8C8E8" }}>{text}</p>
    </motion.div>
  );
}

function CodeSnip({ lines }: { lines: React.ReactNode[] }) {
  return (
    <div className="code-block rounded-lg overflow-auto text-xs md:text-sm">
      {lines.map((l, i) => <div key={i}>{l}</div>)}
    </div>
  );
}

// ─────────────────────────────────────────────
// SLIDE 1 — VUE D'ENSEMBLE
// ─────────────────────────────────────────────
function Slide01Overview() {
  return (
    <div className="relative w-full h-full bg-grid flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #050D1A 0%, #0A1628 100%)" }}>

      {/* Animated grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-60" />

      {/* Glow orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 animate-pulse-blue"
        style={{ background: "radial-gradient(circle, #1E90FF, transparent 70%)" }} />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left */}
        <div>
          <motion.div {...s(0)} className="flex items-center gap-3 mb-5">
            <div className="w-2 h-2 rounded-full animate-blink" style={{ background: "#00D4FF" }} />
            <span className="text-xs font-mono" style={{ color: "#7B9EC9" }}>PROJET FIN D&apos;ÉTUDES · 2025</span>
          </motion.div>

          <motion.div {...s(1)}>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight text-gradient-shimmer mb-3">
              MaCake
            </h1>
          </motion.div>

          <motion.p {...s(2)} className="text-lg md:text-xl font-semibold mb-2" style={{ color: "#E8F4FD" }}>
            Plateforme digitale de pâtisserie à domicile
          </motion.p>

          <motion.p {...s(3)} className="text-sm md:text-base leading-relaxed mb-6" style={{ color: "#7B9EC9" }}>
            Marketplace connectant <span style={{ color: "#00D4FF" }}>pâtissiers</span>,{" "}
            <span style={{ color: "#00D4FF" }}>clients</span> et{" "}
            <span style={{ color: "#00D4FF" }}>livreurs</span> via une architecture microservices distribuée.
          </motion.p>

          <motion.div {...s(4)} className="flex flex-wrap gap-2">
            {["NestJS 11", "MongoDB", "Redis", "RabbitMQ", "Docker", "Expo"].map(t => (
              <TechBadge key={t} label={t} />
            ))}
          </motion.div>
        </div>

        {/* Right — mini arch diagram */}
        <motion.div {...s(3)} className="glass-bright rounded-2xl p-6 space-y-3">
          <p className="text-xs font-mono mb-4" style={{ color: "#7B9EC9" }}>// Acteurs du système</p>

          {[
            { icon: "📱", label: "Client", role: "Commande & paiement", color: "#1E90FF" },
            { icon: "👩‍🍳", label: "Pâtissière", role: "Catalogue & préparation", color: "#00D4FF" },
            { icon: "🛵", label: "Livreur", role: "Livraison (modèle InDrive)", color: "#7B9EC9" },
            { icon: "🛡️", label: "Admin", role: "Gestion & supervision", color: "#A8C8E8" },
          ].map((a, i) => (
            <motion.div key={i} {...s(i + 4)} className="card p-3 flex items-center gap-3">
              <span className="text-xl">{a.icon}</span>
              <div>
                <p className="font-bold text-sm" style={{ color: a.color }}>{a.label}</p>
                <p className="text-xs" style={{ color: "#7B9EC9" }}>{a.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SLIDE 2 — PROBLÈME TECHNIQUE
// ─────────────────────────────────────────────
function Slide02Problem() {
  const problems = [
    { icon: "⚙️", title: "Gestion multi-services", desc: "Coordonner Auth, Order, Catalog, Payment, Notation de façon indépendante et fiable." },
    { icon: "🔄", title: "Synchronisation des données", desc: "Un order-service doit enrichir ses données avec auth-service et notation-service sans couplage fort." },
    { icon: "⚡", title: "Performance distribuée", desc: "Agrégation de données depuis N services sans générer des appels N+1 et des latences cumulées." },
    { icon: "🔐", title: "Sécurité centralisée", desc: "Authentification JWT et autorisation par rôle sans dupliquer la logique dans chaque service." },
    { icon: "📡", title: "Point d'entrée unique", desc: "Exposer une API cohérente sans exposer les ports internes de chaque microservice." },
  ];
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #050D1A 0%, #0A0F1E 100%)" }}>

      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full blur-[100px] opacity-10"
        style={{ background: "#FF4444" }} />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-8 md:px-16">
        <SlideHeader tag="// SLIDE 02 · DÉFIS TECHNIQUES" title={<>Problèmes <span className="text-gradient">Techniques</span></>}
          subtitle="Défis d'architecture identifiés lors de la conception du système" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {problems.map((p, i) => (
            <motion.div key={i} {...s(i + 3)} className={`card p-4 ${i === 4 ? "md:col-span-2" : ""}`}>
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">{p.icon}</span>
                <div>
                  <p className="font-bold text-sm mb-1" style={{ color: "#00D4FF" }}>{p.title}</p>
                  <p className="text-xs md:text-sm leading-relaxed" style={{ color: "#7B9EC9" }}>{p.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SLIDE 3 — TECHNOLOGIES
// ─────────────────────────────────────────────
function Slide03Technologies() {
  const techs = [
    {
      icon: "🏗️", name: "NestJS 11", category: "Backend Framework",
      why: "Architecture modulaire, decorators TypeScript, support natif TCP microservices et RabbitMQ.",
      color: "#E0234E",
    },
    {
      icon: "🍃", name: "MongoDB", category: "Base de données",
      why: "Schéma flexible par service. Mongoose ODM. Database-per-service pattern pour l'isolation.",
      color: "#47A248",
    },
    {
      icon: "⚡", name: "Redis", category: "Cache & Registry",
      why: "Service registry dynamique (clé/valeur JSON), cache des sessions JWT, cache des notations.",
      color: "#DC382D",
    },
    {
      icon: "🐇", name: "RabbitMQ", category: "Message Broker",
      why: "Communication asynchrone inter-services. Queues durables: auth_queue, orders_queue, etc.",
      color: "#FF6600",
    },
    {
      icon: "🐳", name: "Docker Compose", category: "Containerisation",
      why: "Orchestration locale de 9 containers (services + infra). Réseau bridge macake-network.",
      color: "#2496ED",
    },
    {
      icon: "📱", name: "Expo / React Native", category: "Frontend Mobile",
      why: "Cross-platform iOS/Android. expo-router, Redux Toolkit, nativewind, socket.io-client.",
      color: "#000020",
    },
  ];
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{ background: "#050D1A" }}>
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16">
        <SlideHeader tag="// SLIDE 03 · STACK TECHNIQUE" title={<>Technologies <span className="text-gradient">Choisies</span></>} />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {techs.map((t, i) => (
            <motion.div key={i} {...s(i + 2)} className="card p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{t.icon}</span>
                <div>
                  <p className="font-bold text-sm" style={{ color: "#E8F4FD" }}>{t.name}</p>
                  <p className="text-[10px] font-mono" style={{ color: t.color }}>{t.category}</p>
                </div>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "#7B9EC9" }}>{t.why}</p>
            </motion.div>
          ))}
        </div>

        <motion.div {...s(8)} className="mt-4 flex flex-wrap gap-2 items-center">
          <span className="text-xs font-mono" style={{ color: "#7B9EC9" }}>+ Also:</span>
          {["Stripe (Paiements)", "MinIO S3 (Fichiers)", "Socket.io (Temps réel)", "JWT (Auth)", "Winston (Logs)", "bcryptjs (Hashing)"].map(t => (
            <TechBadge key={t} label={t} color="#7B9EC9" />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SLIDE 4 — ARCHITECTURE SYSTÈME
// ─────────────────────────────────────────────
function Slide04Architecture() {
  const services = [
    { name: "auth-service", port: "3001", db: "auth_db", icon: "🔐" },
    { name: "catalog-service", port: "3002", db: "catalog_db", icon: "🧁" },
    { name: "order-service", port: "3003", db: "orders_db", icon: "📦" },
    { name: "payment-service", port: "3005", db: "payment_db", icon: "💳" },
    { name: "notation-service", port: "3006", db: "notation_db", icon: "⭐" },
  ];
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{ background: "#050D1A" }}>
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16">
        <SlideHeader tag="// SLIDE 04 · ARCHITECTURE" title={<>Architecture <span className="text-gradient">Microservices</span></>} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Left — client */}
          <div className="space-y-3">
            <motion.div {...s(2)} className="card p-4 text-center">
              <div className="text-3xl mb-2">📱</div>
              <p className="font-bold text-sm" style={{ color: "#E8F4FD" }}>Expo / React Native</p>
              <p className="text-xs" style={{ color: "#7B9EC9" }}>Frontend Mobile</p>
            </motion.div>
            <motion.div {...s(3)} className="text-center text-xs font-mono" style={{ color: "#1E90FF" }}>
              ↓ HTTP REST (port 3000)
            </motion.div>
            <motion.div {...s(4)} className="card p-4 text-center animate-pulse-blue">
              <div className="text-3xl mb-2">🌐</div>
              <p className="font-bold text-sm" style={{ color: "#00D4FF" }}>API Gateway</p>
              <p className="text-xs" style={{ color: "#7B9EC9" }}>Port 3000 · JWT · Rate Limit</p>
            </motion.div>
          </div>

          {/* Center — services */}
          <div className="space-y-2">
            <motion.div {...s(2)} className="text-center text-xs font-mono mb-2" style={{ color: "#1E90FF" }}>
              ← TCP (sync) →
            </motion.div>
            {services.map((svc, i) => (
              <motion.div key={i} {...s(i + 3)} className="card p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>{svc.icon}</span>
                  <div>
                    <p className="text-xs font-mono font-bold" style={{ color: "#E8F4FD" }}>{svc.name}</p>
                    <p className="text-[10px] font-mono" style={{ color: "#7B9EC9" }}>:{svc.port} · {svc.db}</p>
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full" style={{ background: "#00D4FF" }} />
              </motion.div>
            ))}
          </div>

          {/* Right — infra */}
          <div className="space-y-3">
            {[
              { icon: "🍃", label: "MongoDB ×5", sub: "Database per service", color: "#47A248" },
              { icon: "⚡", label: "Redis", sub: "Registry + Cache", color: "#DC382D" },
              { icon: "🐇", label: "RabbitMQ", sub: "Async messaging", color: "#FF6600" },
              { icon: "📁", label: "MinIO S3", sub: "File storage", color: "#C72D54" },
            ].map((item, i) => (
              <motion.div key={i} {...s(i + 3)} className="card p-3 flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <p className="font-bold text-xs" style={{ color: item.color }}>{item.label}</p>
                  <p className="text-[10px]" style={{ color: "#7B9EC9" }}>{item.sub}</p>
                </div>
              </motion.div>
            ))}
            <motion.div {...s(7)} className="text-center text-xs font-mono" style={{ color: "#7B9EC9" }}>
              🐳 Docker bridge network
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SLIDE 5 — API GATEWAY
// ─────────────────────────────────────────────
function Slide05Gateway() {
  const routes = [
    { key: "s1", svc: "auth-service", port: "3001", ex: "/s1/auth/login" },
    { key: "s2", svc: "catalog-service", port: "3002", ex: "/s2/products" },
    { key: "s3", svc: "order-service", port: "3003", ex: "/s3/order/create" },
    { key: "s4", svc: "payment-service", port: "3005", ex: "/s4/payment" },
    { key: "s5", svc: "notation-service", port: "3006", ex: "/s5/rating" },
  ];
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{ background: "#050D1A" }}>
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left */}
        <div>
          <SlideHeader tag="// SLIDE 05 · API GATEWAY" title={<>API <span className="text-gradient">Gateway</span></>}
            subtitle="Point d'entrée unique — centralise, sécurise et route les requêtes" />

          <div className="space-y-3 mb-5">
            <Bullet icon="🌐" text="Port unique 3000 exposé au client (tous les services sont masqués)" delay={3} />
            <Bullet icon="🔐" text="Middleware JWT: vérifie le token, attache req.user au contexte" delay={4} />
            <Bullet icon="🎭" text="AuthorizeMiddleware: contrôle RBAC (client / patissiere / livreur / admin)" delay={5} />
            <Bullet icon="⚡" text="Rate limiting global: 100 req/IP/minute via ThrottlerModule" delay={6} />
            <Bullet icon="🔁" text="Forward TCP: crée un client TCP vers le service cible, attend la réponse" delay={7} />
            <Bullet icon="📡" text="WebSocket Gateway: updates temps réel (commandes, notations)" delay={8} />
          </div>

          <motion.div {...s(9)}>
            <CodeSnip lines={[
              <><span className="kw">const</span> instance = <span className="kw">await</span> <span className="fn">getServiceInstance</span>(<span className="str">&apos;s3&apos;</span>);</>,
              <><span className="kw">const</span> client = <span className="fn">createTcpClient</span>(instance.host, instance.port);</>,
              <><span className="kw">return</span> client.<span className="fn">send</span>(pattern, payload);</>,
            ]} />
          </motion.div>
        </div>

        {/* Right — routing table */}
        <motion.div {...s(3)} className="glass-bright rounded-xl p-5">
          <p className="text-xs font-mono mb-4" style={{ color: "#7B9EC9" }}>// Table de routage Gateway</p>
          <div className="space-y-2">
            {routes.map((r, i) => (
              <motion.div key={i} {...s(i + 4)} className="card p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="tech-badge text-[10px]">{r.key}</span>
                  <span className="text-[10px] font-mono" style={{ color: "#7B9EC9" }}>:{r.port}</span>
                </div>
                <p className="text-xs font-mono" style={{ color: "#00D4FF" }}>{r.svc}</p>
                <p className="text-[10px] font-mono" style={{ color: "#7B9EC9" }}>{r.ex}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SLIDE 6 — SERVICE DISCOVERY (CUSTOM)
// ─────────────────────────────────────────────
function Slide06ServiceDiscovery() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{ background: "#050D1A" }}>
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[120px] opacity-8"
        style={{ background: "#DC382D" }} />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left */}
        <div>
          <SlideHeader tag="// SLIDE 06 · SERVICE DISCOVERY" title={<>Service <span className="text-gradient">Discovery</span></>}
            subtitle="Implémentation custom basée sur Redis — sans outil externe (pas de Consul/Eureka)" />

          <div className="space-y-3">
            <Bullet icon="📝" text="Chaque service appelle registerServiceInfo() au démarrage" delay={3} />
            <Bullet icon="🗝️" text="Clé Redis: serviceKey:{routeKey} → JSON {instances, endpoints}" delay={4} />
            <Bullet icon="🌐" text="Le Gateway lit Redis pour localiser dynamiquement le service cible" delay={5} />
            <Bullet icon="⚖️" text="Load balancing: sélection aléatoire parmi les instances disponibles" delay={6} />
            <Bullet icon="🔌" text="Avantage: zéro dépendance externe, intégré nativement avec le stack NestJS+Redis" delay={7} />
          </div>
        </div>

        {/* Right — code */}
        <motion.div {...s(3)} className="space-y-4">
          <div className="glass-bright rounded-xl p-4">
            <p className="text-[10px] font-mono mb-3" style={{ color: "#7B9EC9" }}>
              // auth-service/src — Enregistrement au démarrage
            </p>
            <CodeSnip lines={[
              <><span className="cm">// main.ts — bootstrap()</span></>,
              <><span className="kw">await</span> redisService.<span className="fn">registerServiceInfo</span>{"({"}</>,
              <>{"  "}<span className="str">serviceName</span>: <span className="str">&apos;auth-service&apos;</span>,</>,
              <>{"  "}<span className="str">host</span>: <span className="str">&apos;auth-service&apos;</span>, <span className="cm">// container name</span></>,
              <>{"  "}<span className="str">port</span>: <span className="num">3001</span>,</>,
              <>{"  "}<span className="str">routeKey</span>: <span className="str">&apos;s1&apos;</span>,</>,
              <>{"}"});</>,
            ]} />
          </div>

          <div className="glass-bright rounded-xl p-4">
            <p className="text-[10px] font-mono mb-3" style={{ color: "#7B9EC9" }}>
              // Redis — Structure stockée
            </p>
            <CodeSnip lines={[
              <><span className="cm">// KEY: serviceKey:s1</span></>,
              <>{"{"}</>,
              <>{"  "}<span className="str">&quot;serviceName&quot;</span>: <span className="str">&quot;auth-service&quot;</span>,</>,
              <>{"  "}<span className="str">&quot;instances&quot;</span>: [{"{"}</>,
              <>{"    "}<span className="str">&quot;host&quot;</span>: <span className="str">&quot;auth-service&quot;</span>, <span className="str">&quot;port&quot;</span>: <span className="num">3001</span></>,
              <>{"  "}{"}"}{"]"},</>,
              <>{"  "}<span className="str">&quot;endpoints&quot;</span>: [<span className="str">&quot;/auth/login&quot;</span>, ...]</>,
              <>{"}"}</>,
            ]} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SLIDE 7 — FLUX DE DONNÉES
// ─────────────────────────────────────────────
function Slide07DataFlow() {
  const steps = [
    { n: "01", label: "Client → Gateway", detail: "POST /s3/order/find-all + Bearer token", color: "#1E90FF" },
    { n: "02", label: "Gateway: JWT check", detail: "AuthMiddleware vérifie le JWT, extrait userId + role", color: "#00D4FF" },
    { n: "03", label: "Gateway: Redis lookup", detail: "getServiceInstance('s3') → {host:'order-service', port:3003}", color: "#DC382D" },
    { n: "04", label: "Gateway → order-service", detail: "TCP send({userId, role, query}) — connection pool NestJS", color: "#FF6600" },
    { n: "05", label: "order-service → MongoDB", detail: "Orders.find({userId}) → liste des commandes", color: "#47A248" },
    { n: "06", label: "Agrégation RabbitMQ", detail: "order-service publie auth_queue pour enrichir les données user", color: "#FF6600" },
    { n: "07", label: "Réponse → Client", detail: "Gateway retransmet la réponse TCP en HTTP JSON 200", color: "#1E90FF" },
  ];
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{ background: "#050D1A" }}>
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16">
        <SlideHeader tag="// SLIDE 07 · DATA FLOW" title={<>Flux de <span className="text-gradient">Données</span></>}
          subtitle="Exemple: récupération des commandes avec données agrégées" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {steps.map((st, i) => (
            <motion.div key={i} {...s(i + 2)} className={`card p-3 flex items-start gap-3 ${i === 6 ? "md:col-span-2" : ""}`}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-mono font-bold text-xs"
                style={{ background: `${st.color}18`, color: st.color, border: `1px solid ${st.color}40` }}>
                {st.n}
              </div>
              <div>
                <p className="font-bold text-xs md:text-sm" style={{ color: "#E8F4FD" }}>{st.label}</p>
                <p className="text-[11px] md:text-xs font-mono" style={{ color: "#7B9EC9" }}>{st.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SLIDE 8 — OPTIMISATION
// ─────────────────────────────────────────────
function Slide08Optimization() {
  const opts = [
    {
      icon: "📦", title: "Batch findByIds()",
      desc: "Plutôt que N appels individuels pour enrichir les commandes, auth-service expose findByIds(ids[]) — un seul appel TCP pour N utilisateurs.",
      tag: "N+1 → O(1)",
      tagColor: "#47A248",
    },
    {
      icon: "⚡", title: "Cache Redis des notations",
      desc: "Les moyennes de notation sont stockées en cache Redis avec TTL. getAverageForUsers([...]) évite les recalculs répétitifs.",
      tag: "Cache TTL",
      tagColor: "#DC382D",
    },
    {
      icon: "🐇", title: "Async RabbitMQ",
      desc: "Les opérations non critiques (notifications, mises à jour statistiques) passent par RabbitMQ. Pas de blocage du thread principal.",
      tag: "Non-blocking",
      tagColor: "#FF6600",
    },
    {
      icon: "🗃️", title: "Pagination & filtres",
      desc: "Tous les endpoints list supportent la pagination. Les produits sont filtrables par ville, prix, note — index MongoDB sur ces champs.",
      tag: "Indexes DB",
      tagColor: "#1E90FF",
    },
    {
      icon: "🔒", title: "Connexion pool TCP",
      desc: "Le Gateway maintient des connexions TCP persistantes vers chaque service. Pas de handshake à chaque requête — latence réduite.",
      tag: "Keep-alive",
      tagColor: "#00D4FF",
    },
    {
      icon: "📁", title: "Upload S3 base64",
      desc: "Les images sont transférées en base64 via TCP, uploadées sur MinIO S3 par le service concerné — découplage du stockage.",
      tag: "Async upload",
      tagColor: "#C72D54",
    },
  ];
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{ background: "#050D1A" }}>
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16">
        <SlideHeader tag="// SLIDE 08 · OPTIMISATION" title={<>Stratégies <span className="text-gradient">d&apos;Optimisation</span></>} />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {opts.map((o, i) => (
            <motion.div key={i} {...s(i + 2)} className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl">{o.icon}</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded"
                  style={{ background: `${o.tagColor}18`, color: o.tagColor, border: `1px solid ${o.tagColor}40` }}>
                  {o.tag}
                </span>
              </div>
              <p className="font-bold text-xs mb-1" style={{ color: "#E8F4FD" }}>{o.title}</p>
              <p className="text-[11px] leading-relaxed" style={{ color: "#7B9EC9" }}>{o.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SLIDE 9 — DÉFIS & SOLUTIONS
// ─────────────────────────────────────────────
function Slide09Challenges() {
  const pairs = [
    {
      challenge: "Timeout TCP inter-services",
      solution: "Heartbeat RabbitMQ (30s) + retry automatique. Pool de connexions TCP persistantes au Gateway.",
      cIcon: "⏱️", sIcon: "✅",
    },
    {
      challenge: "Cohérence des données entre services",
      solution: "Event-driven via RabbitMQ: notation-service s'abonne à catalog_queue pour rester synchronisé.",
      cIcon: "🔄", sIcon: "✅",
    },
    {
      challenge: "Gestion des refresh tokens sécurisée",
      solution: "Refresh token stocké en HttpOnly cookie (30j). Access token court (15min). Logout invalide dans Redis.",
      cIcon: "🔐", sIcon: "✅",
    },
    {
      challenge: "Isolation des bases de données",
      solution: "Database-per-service pattern: chaque service a son propre MongoDB (auth_db, orders_db, etc.).",
      cIcon: "🗃️", sIcon: "✅",
    },
    {
      challenge: "Montée en charge et scalabilité",
      solution: "Service registry multi-instances: Redis stocke un array d'instances. Gateway sélectionne aléatoirement.",
      cIcon: "📈", sIcon: "✅",
    },
    {
      challenge: "Paiement sécurisé (escrow)",
      solution: "Stripe PaymentIntent + status 'blocked'. Libéré uniquement après confirmation livraison client.",
      cIcon: "💳", sIcon: "✅",
    },
  ];
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{ background: "#050D1A" }}>
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16">
        <SlideHeader tag="// SLIDE 09 · DÉFIS & SOLUTIONS" title={<>Défis <span className="text-gradient">& Solutions</span></>} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {pairs.map((p, i) => (
            <motion.div key={i} {...s(i + 2)} className="card p-4">
              <div className="flex items-start gap-2 mb-2 pb-2" style={{ borderBottom: "1px solid rgba(30,144,255,0.1)" }}>
                <span className="text-base">{p.cIcon}</span>
                <p className="text-xs font-bold" style={{ color: "#FF6B6B" }}>{p.challenge}</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-base">{p.sIcon}</span>
                <p className="text-xs leading-relaxed" style={{ color: "#7B9EC9" }}>{p.solution}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SLIDE 10 — CONCLUSION
// ─────────────────────────────────────────────
function Slide10Conclusion() {
  const skills = [
    "Architecture microservices NestJS",
    "API Gateway & Service Discovery Redis",
    "Communication TCP + RabbitMQ",
    "JWT Auth & RBAC middleware",
    "Docker Compose orchestration",
    "Stripe escrow payment flow",
  ];
  const improvements = [
    { icon: "☸️", text: "Migration vers Kubernetes pour la production" },
    { icon: "⚡", text: "Remplacer TCP par gRPC (Protocol Buffers)" },
    { icon: "📊", text: "Observabilité: OpenTelemetry + Grafana" },
    { icon: "🔁", text: "CQRS + Event Sourcing pour l'audit trail" },
  ];
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #050D1A 0%, #0A1628 70%, #050D1A 100%)" }}>
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 animate-pulse-blue"
        style={{ background: "radial-gradient(circle, #1E90FF, transparent 70%)" }} />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Center — title */}
        <div className="md:col-span-1">
          <motion.div {...s(0)} className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full animate-blink" style={{ background: "#00D4FF" }} />
            <span className="text-xs font-mono" style={{ color: "#7B9EC9" }}>// SLIDE 10 · FIN</span>
          </motion.div>

          <motion.h2 {...s(1)} className="text-4xl md:text-5xl font-black leading-tight mb-4 text-gradient">
            Merci !
          </motion.h2>

          <motion.p {...s(2)} className="text-sm leading-relaxed mb-4" style={{ color: "#7B9EC9" }}>
            MaCake nous a permis de concevoir et implémenter une architecture microservices complète, de la sécurité au déploiement.
          </motion.p>

          <motion.div {...s(3)} className="glass-bright rounded-xl p-4 text-center">
            <p className="text-3xl font-black text-gradient mb-1">5</p>
            <p className="text-xs" style={{ color: "#7B9EC9" }}>microservices</p>
            <div className="h-px w-12 mx-auto my-2" style={{ background: "rgba(30,144,255,0.3)" }} />
            <p className="text-3xl font-black text-gradient mb-1">9</p>
            <p className="text-xs" style={{ color: "#7B9EC9" }}>containers Docker</p>
            <div className="h-px w-12 mx-auto my-2" style={{ background: "rgba(30,144,255,0.3)" }} />
            <p className="text-3xl font-black text-gradient mb-1">+40</p>
            <p className="text-xs" style={{ color: "#7B9EC9" }}>endpoints API</p>
          </motion.div>
        </div>

        {/* Skills */}
        <div>
          <motion.p {...s(2)} className="text-xs font-mono mb-3" style={{ color: "#7B9EC9" }}>// Compétences acquises</motion.p>
          <div className="space-y-2">
            {skills.map((sk, i) => (
              <motion.div key={i} {...s(i + 3)} className="card p-2.5 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#1E90FF" }} />
                <p className="text-xs" style={{ color: "#A8C8E8" }}>{sk}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Improvements */}
        <div>
          <motion.p {...s(2)} className="text-xs font-mono mb-3" style={{ color: "#7B9EC9" }}>// Améliorations futures</motion.p>
          <div className="space-y-2">
            {improvements.map((imp, i) => (
              <motion.div key={i} {...s(i + 3)} className="card p-3 flex items-start gap-2">
                <span className="text-base">{imp.icon}</span>
                <p className="text-xs leading-relaxed" style={{ color: "#7B9EC9" }}>{imp.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...s(8)} className="mt-3 glass-bright rounded-xl p-3 text-center">
            <p className="text-xs font-mono" style={{ color: "#00D4FF" }}>Questions ? 🎤</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SLIDE REGISTRY
// ─────────────────────────────────────────────
const SLIDES = [
  { id: 1, label: "Vue d'ensemble", component: Slide01Overview },
  { id: 2, label: "Problèmes techniques", component: Slide02Problem },
  { id: 3, label: "Technologies", component: Slide03Technologies },
  { id: 4, label: "Architecture", component: Slide04Architecture },
  { id: 5, label: "API Gateway", component: Slide05Gateway },
  { id: 6, label: "Service Discovery", component: Slide06ServiceDiscovery },
  { id: 7, label: "Flux de données", component: Slide07DataFlow },
  { id: 8, label: "Optimisation", component: Slide08Optimization },
  { id: 9, label: "Défis & Solutions", component: Slide09Challenges },
  { id: 10, label: "Conclusion", component: Slide10Conclusion },
];

// ─────────────────────────────────────────────
// MAIN CONTROLLER
// ─────────────────────────────────────────────
export default function TechPresentation() {
  const [cur, setCur] = useState(0);
  const [dir, setDir] = useState<Dir>(1);

  const goTo = useCallback((i: number) => {
    if (i < 0 || i >= SLIDES.length) return;
    setDir(i > cur ? 1 : -1);
    setCur(i);
  }, [cur]);

  const next = useCallback(() => goTo(cur + 1), [cur, goTo]);
  const prev = useCallback(() => goTo(cur - 1), [cur, goTo]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") { e.preventDefault(); next(); }
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); prev(); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [next, prev]);

  const Active = SLIDES[cur].component;

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#050D1A] select-none">
      {/* Slide */}
      <AnimatePresence initial={false} custom={dir} mode="wait">
        <motion.div key={cur} custom={dir} variants={variants}
          initial="enter" animate="center" exit="exit" transition={tx}
          className="absolute inset-0">
          <Active />
        </motion.div>
      </AnimatePresence>

      {/* Top progress bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 z-50" style={{ background: "rgba(30,144,255,0.1)" }}>
        <motion.div className="h-full"
          style={{ background: "linear-gradient(90deg, #1E90FF, #00D4FF)" }}
          animate={{ width: `${((cur + 1) / SLIDES.length) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }} />
      </div>

      {/* Slide label (top left) */}
      <div className="absolute top-4 left-5 z-50">
        <div className="glass rounded-md px-3 py-1 text-[11px] font-mono" style={{ color: "#7B9EC9" }}>
          {SLIDES[cur].label}
        </div>
      </div>

      {/* Counter (top right) */}
      <div className="absolute top-4 right-5 z-50">
        <div className="glass rounded-md px-3 py-1 text-[11px] font-mono font-bold" style={{ color: "#1E90FF" }}>
          {cur + 1} / {SLIDES.length}
        </div>
      </div>

      {/* Left arrow */}
      {cur > 0 && (
        <button onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full glass flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ color: "#7B9EC9" }} aria-label="Précédent">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      {/* Right arrow */}
      {cur < SLIDES.length - 1 && (
        <button onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full glass flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ color: "#1E90FF" }} aria-label="Suivant">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}

      {/* Bottom dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className={`dot ${i === cur ? "active" : ""}`}
            aria-label={`Slide ${i + 1}`} />
        ))}
      </div>

      {/* Keyboard hint — slide 1 */}
      {cur === 0 && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
          className="absolute bottom-14 left-1/2 -translate-x-1/2 z-50 text-[11px] font-mono"
          style={{ color: "rgba(123,158,201,0.4)" }}>
          ← → pour naviguer · Espace pour avancer
        </motion.p>
      )}
    </div>
  );
}
