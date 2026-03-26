"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────
// TYPES & ANIMATION HELPERS
// ─────────────────────────────────────────────
type Dir = 1 | -1;

const slideVariants = {
  enter: (d: Dir) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: Dir) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
};
const tx = { duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] };

const a = (i: number, base = 0.25) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: base + i * 0.1, duration: 0.45, ease: "easeOut" as const },
});

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const C = {
  bg: "#050D1A",
  card: "#0A1628",
  blue: "#1E90FF",
  cyan: "#00D4FF",
  muted: "#7B9EC9",
  text: "#E8F4FD",
  border: "rgba(30,144,255,0.15)",
  borderBright: "rgba(0,212,255,0.3)",
};

// ─────────────────────────────────────────────
// SHARED COMPONENTS
// ─────────────────────────────────────────────
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <motion.div {...a(0)} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md mb-5 text-[11px] font-mono font-bold"
      style={{ background: "rgba(30,144,255,0.1)", color: C.cyan, border: `1px solid ${C.borderBright}` }}>
      {children}
    </motion.div>
  );
}

function H({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-8">
      <motion.h2 {...a(1)} className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-3" style={{ color: C.text }}>
        {children}
      </motion.h2>
      {sub && <motion.p {...a(2)} className="text-sm md:text-base mt-1" style={{ color: C.muted }}>{sub}</motion.p>}
    </div>
  );
}

function Card({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`rounded-xl p-6 ${className}`}
      style={{ background: C.card, border: `1px solid ${C.border}`, ...style }}>
      {children}
    </div>
  );
}

function Chip({ label, color = C.blue }: { label: string; color?: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold"
      style={{ background: `${color}18`, color, border: `1px solid ${color}40` }}>
      {label}
    </span>
  );
}

function SlideWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ background: C.bg }}>
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }} />
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center px-6 sm:px-10 md:px-16 lg:px-24 pt-[56px] pb-[52px]">
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SLIDE 1 — TITRE
// ─────────────────────────────────────────────
function Slide01() {
  return (
    <SlideWrap>
      {/* Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(circle, #1E90FF, transparent 70%)" }} />
      <div className="absolute top-10 right-10 text-[6rem] opacity-5 pointer-events-none">🎂</div>
      <div className="absolute bottom-10 left-10 text-[5rem] opacity-5 pointer-events-none">🧁</div>

      <div className="text-center max-w-3xl w-full">
        {/* Badge */}
        <motion.div {...a(0)} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-mono"
          style={{ background: "rgba(30,144,255,0.1)", color: C.cyan, border: `1px solid ${C.borderBright}` }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background: C.cyan }} />
          Projet de Fin d&apos;Études · 2024 – 2026
        </motion.div>

        {/* Logo */}
        <motion.div {...a(1)}>
          <h1 className="text-[5rem] md:text-[7rem] lg:text-[9rem] font-black leading-none tracking-tight mb-4"
            style={{
              background: `linear-gradient(135deg, ${C.blue} 0%, ${C.cyan} 50%, #ffffff 100%)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
            MaCake
          </h1>
        </motion.div>

        <motion.div {...a(2)} className="h-px w-32 mx-auto mb-6" style={{ background: `linear-gradient(90deg, transparent, ${C.blue}, transparent)` }} />

        <motion.p {...a(3)} className="text-lg md:text-xl font-semibold mb-3" style={{ color: C.text }}>
          Plateforme digitale de pâtisserie à domicile
        </motion.p>

        <motion.p {...a(4)} className="text-sm md:text-base leading-relaxed mb-8" style={{ color: C.muted }}>
          Une marketplace connectant <span style={{ color: C.cyan }}>pâtissiers artisanaux</span> et{" "}
          <span style={{ color: C.cyan }}>clients</span> — commande, livraison et paiement sécurisé.
        </motion.p>

        {/* Meta info */}
        <motion.div {...a(5)} className="flex flex-wrap justify-center gap-3">
          {[
            { icon: "🎓", label: "PFE — Génie Informatique" },
            { icon: "📅", label: "Année : 2024 – 2026" },
            { icon: "🏫", label: "YouCode Maroc" },
          ].map((m, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-lg"
              style={{ background: "rgba(30,144,255,0.07)", border: `1px solid ${C.border}` }}>
              <span className="text-base">{m.icon}</span>
              <span className="text-xs font-medium" style={{ color: C.muted }}>{m.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </SlideWrap>
  );
}

// ─────────────────────────────────────────────
// SLIDE 2 — INTRODUCTION
// ─────────────────────────────────────────────
function Slide02() {
  return (
    <SlideWrap>
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
          {/* Left */}
          <div>
            <Tag>// SLIDE 02 · INTRODUCTION</Tag>
            <H sub="Pourquoi ce projet existe-t-il ?">Introduction & <span style={{ color: C.cyan }}>Contexte</span></H>

            <div className="space-y-4">
              <motion.div {...a(3)}>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: C.muted }}>
                  Au Maroc, des millions de <span style={{ color: C.text, fontWeight: 600 }}>pâtissiers talentueux</span>{" "}
                  travaillent depuis leur domicile — gâteaux personnalisés, macarons artisanaux, pâtisseries traditionnelles.
                </p>
              </motion.div>
              <motion.div {...a(4)}>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: C.muted }}>
                  Pourtant, ils n&apos;ont <span style={{ color: "#FF6B6B", fontWeight: 600 }}>aucun canal digital</span>{" "}
                  pour atteindre leurs clients : pas de boutique en ligne, pas de gestion de commandes, pas de visibilité.
                </p>
              </motion.div>
              <motion.div {...a(5)}>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: C.muted }}>
                  <span style={{ color: C.cyan, fontWeight: 600 }}>MaCake</span> est né de ce constat :{" "}
                  créer la première marketplace marocaine dédiée à la pâtisserie artisanale à domicile.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right — context cards */}
          <div className="space-y-4">
            {[
              { icon: "🇲🇦", title: "Contexte local", desc: "Marché artisanal marocain non structuré et non digitalisé", color: "#E91E63" },
              { icon: "📱", title: "Explosion du mobile", desc: "Plus de 70% des Marocains utilisent un smartphone pour acheter", color: C.blue },
              { icon: "🏠", title: "Économie domicile", desc: "Croissance des micro-entrepreneurs travaillant depuis chez eux", color: "#47A248" },
              { icon: "🎯", title: "Opportunité", desc: "Aucune solution existante ne cible spécifiquement ce marché", color: C.cyan },
            ].map((c, i) => (
              <motion.div key={i} {...a(i + 3)}>
                <div
                  className="flex items-center gap-5 rounded-xl px-5 py-4"
                  style={{
                    background: C.card,
                    border: `1px solid ${c.color}30`,
                    borderLeft: `4px solid ${c.color}`,
                  }}
                >
                  {/* Icon bubble */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                    style={{ background: `${c.color}18` }}
                  >
                    {c.icon}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm md:text-base mb-1" style={{ color: c.color }}>
                      {c.title}
                    </p>
                    <p className="text-xs md:text-sm leading-relaxed" style={{ color: C.muted }}>
                      {c.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}

// ─────────────────────────────────────────────
// SLIDE 3 — PROBLÉMATIQUE
// ─────────────────────────────────────────────
function Slide03() {
  const problems = [
    { icon: "👁️", title: "Manque de visibilité", desc: "Les pâtissiers ne peuvent pas exposer leurs créations à grande échelle. Leur clientèle reste limitée à l'entourage proche." },
    { icon: "📋", title: "Gestion manuelle des commandes", desc: "Les commandes se font par WhatsApp ou téléphone : aucun suivi, risque d'oubli, paiement incertain." },
    { icon: "🔍", title: "Difficulté à trouver", desc: "Les clients peinent à trouver des créations artisanales de qualité près de chez eux." },
    { icon: "💸", title: "Revenus instables", desc: "Sans canal stable, les revenus des pâtissiers sont aléatoires et insuffisants." },
    { icon: "📦", title: "Zéro traçabilité", desc: "Pas de historique de commandes, pas de suivi de livraison, pas de système de confiance." },
    { icon: "🌐", title: "Absence de digital", desc: "Aucune plateforme spécialisée en pâtisserie artisanale n'existe sur le marché marocain." },
  ];
  return (
    <SlideWrap>
      <div className="w-full max-w-6xl mx-auto">
        <div className="w-full">
          <Tag>// SLIDE 03 · PROBLÉMATIQUE</Tag>
          <H sub="Problèmes identifiés sur le terrain">La <span style={{ color: "#FF6B6B" }}>Problématique</span></H>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {problems.map((p, i) => (
              <motion.div key={i} {...a(i + 2)} className="h-full">
                <div className="flex flex-col gap-3 rounded-xl p-5 h-full"
                  style={{ background: C.card, border: "1px solid rgba(255,107,107,0.2)", borderLeft: "4px solid #FF6B6B" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                      style={{ background: "rgba(255,107,107,0.12)" }}>
                      {p.icon}
                    </div>
                    <p className="font-bold text-xs md:text-sm leading-snug" style={{ color: "#FF8A80" }}>{p.title}</p>
                  </div>
                  <p className="text-[11px] md:text-xs leading-relaxed" style={{ color: C.muted }}>{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}

// ─────────────────────────────────────────────
// SLIDE 4 — OBJECTIFS
// ─────────────────────────────────────────────
function Slide04() {
  const objectives = [
    { n: "01", icon: "🛒", title: "Marketplace dédiée", desc: "Créer une plateforme spécialisée permettant aux pâtissiers de vendre leurs créations en ligne facilement." },
    { n: "02", icon: "📱", title: "Visibilité numérique", desc: "Offrir à chaque pâtissier une vitrine digitale : catalogue, photos, prix, avis clients." },
    { n: "03", icon: "⚡", title: "Commandes simplifiées", desc: "Automatiser le processus de commande : de la sélection produit à la confirmation livraison." },
    { n: "04", icon: "🛵", title: "Livraison intégrée", desc: "Connecter les livreurs indépendants aux commandes via un modèle de proposition de prix (InDrive)." },
    { n: "05", icon: "🔐", title: "Paiement sécurisé", desc: "Système escrow : paiement bloqué jusqu'à confirmation de livraison par le client." },
    { n: "06", icon: "⭐", title: "Système de confiance", desc: "Notations, avis et suivi de réputation pour garantir la qualité et instaurer la confiance." },
  ];
  return (
    <SlideWrap>
      <div className="w-full max-w-6xl mx-auto">
        <div className="w-full">
          <Tag>// SLIDE 04 · OBJECTIFS</Tag>
          <H sub="Ce que le projet vise à accomplir">Objectifs du <span style={{ color: C.cyan }}>Projet</span></H>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {objectives.map((o, i) => (
              <motion.div key={i} {...a(i + 2)} className="h-full">
                <div className="flex flex-col gap-3 rounded-xl p-5 h-full"
                  style={{ background: C.card, border: `1px solid ${C.border}`, borderLeft: `4px solid ${C.cyan}` }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                      style={{ background: `${C.cyan}15` }}>
                      {o.icon}
                    </div>
                    <div>
                      <span className="font-mono font-black text-[10px] block" style={{ color: C.blue }}>{o.n}</span>
                      <p className="font-bold text-xs md:text-sm leading-snug" style={{ color: C.text }}>{o.title}</p>
                    </div>
                  </div>
                  <p className="text-[11px] md:text-xs leading-relaxed" style={{ color: C.muted }}>{o.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}

// ─────────────────────────────────────────────
// SLIDE 5 — SOLUTION (MACAKE)
// ─────────────────────────────────────────────
function Slide05() {
  return (
    <SlideWrap>
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
          {/* Left */}
          <div>
            <Tag>// SLIDE 05 · SOLUTION</Tag>
            <H sub="L'idée globale de la plateforme">La Solution : <span style={{ color: C.cyan }}>MaCake</span></H>

            <motion.div {...a(3)} className="mb-5 rounded-xl p-5"
              style={{ background: "rgba(0,212,255,0.06)", border: `1px solid ${C.borderBright}`, borderLeft: `4px solid ${C.cyan}` }}>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: C.text }}>
                MaCake est une <strong style={{ color: C.cyan }}>marketplace mobile-first</strong> qui met en relation directe les pâtissiers à domicile avec leurs clients, intégrant commande, livraison et paiement dans un seul écosystème.
              </p>
            </motion.div>

            <div className="space-y-3">
              {[
                { icon: "🔗", prob: "Manque de visibilité", sol: "Vitrine digitale avec catalogue produits", color: C.blue },
                { icon: "📋", prob: "Commandes manuelles", sol: "Système de commande automatisé & traçable", color: C.cyan },
                { icon: "💸", prob: "Paiement incertain", sol: "Paiement sécurisé via Stripe (escrow)", color: "#47A248" },
                { icon: "🛵", prob: "Livraison désorganisée", sol: "Livreurs indépendants avec offres de prix", color: "#FF6600" },
              ].map((r, i) => (
                <motion.div key={i} {...a(i + 4)}>
                  <div className="flex items-center gap-4 rounded-xl px-4 py-3"
                    style={{ background: C.card, border: `1px solid ${r.color}25`, borderLeft: `4px solid ${r.color}` }}>
                    <span className="text-xl shrink-0">{r.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] line-through mb-0.5" style={{ color: "#FF6B6B55" }}>{r.prob}</p>
                      <p className="text-xs font-semibold" style={{ color: r.color }}>{r.sol}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — flow diagram */}
          <motion.div {...a(3)}>
            <div className="rounded-xl p-6"
              style={{ background: C.card, border: `1px solid ${C.border}`, borderLeft: `4px solid ${C.cyan}` }}>
              <p className="text-[10px] font-mono mb-4" style={{ color: C.muted }}>// Flux principal MaCake</p>
              <div className="space-y-2">
                {[
                  { icon: "👤", label: "Client", action: "Parcourt le catalogue", color: C.blue },
                  { arrow: true },
                  { icon: "🛒", label: "Commande", action: "Sélectionne & commande", color: C.cyan },
                  { arrow: true },
                  { icon: "👩‍🍳", label: "Pâtissier", action: "Accepte & prépare", color: "#E91E63" },
                  { arrow: true },
                  { icon: "🛵", label: "Livreur", action: "Récupère & livre", color: "#FF6600" },
                  { arrow: true },
                  { icon: "✅", label: "Confirmation", action: "Client confirme → paiement libéré", color: "#47A248" },
                ].map((step, i) => {
                  if ("arrow" in step) {
                    return <div key={i} className="text-center text-sm font-mono" style={{ color: C.muted }}>↓</div>;
                  }
                  return (
                    <div key={i} className="flex items-center gap-3 rounded-xl px-4 py-3"
                      style={{ background: `${step.color}0f`, border: `1px solid ${step.color}30`, borderLeft: `3px solid ${step.color}` }}>
                      <span className="text-lg shrink-0">{step.icon}</span>
                      <div>
                        <p className="text-xs font-bold" style={{ color: step.color }}>{step.label}</p>
                        <p className="text-[10px]" style={{ color: C.muted }}>{step.action}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SlideWrap>
  );
}

// ─────────────────────────────────────────────
// SLIDE 6 — ACTEURS & RÔLES
// ─────────────────────────────────────────────
function Slide06() {
  const actors = [
    {
      icon: "👤", name: "Client", color: C.blue,
      can: [
        "Créer un compte et se connecter",
        "Parcourir le catalogue et filtrer par ville / catégorie",
        "Passer une commande personnalisée (couleur, message)",
        "Payer en ligne via Stripe (escrow sécurisé)",
        "Suivre l'état de sa commande en temps réel",
        "Choisir son livreur parmi les offres reçues",
        "Confirmer la livraison et débloquer le paiement",
        "Noter le produit et le pâtissier",
      ],
    },
    {
      icon: "👩‍🍳", name: "Pâtissier", color: "#E91E63",
      can: [
        "Créer et gérer son catalogue produits",
        "Ajouter des photos, prix et descriptions",
        "Recevoir et accepter les commandes entrantes",
        "Marquer une commande comme prête à livrer",
        "Gérer son profil, sa bio et sa réputation",
        "Consulter ses revenus et statistiques",
        "Recevoir des abonnés et des avis clients",
      ],
    },
    {
      icon: "🛵", name: "Livreur", color: "#FF6600",
      can: [
        "Créer un compte livreur et se connecter",
        "Consulter les commandes disponibles à livrer",
        "Proposer un prix de livraison (modèle InDrive)",
        "Être sélectionné par le client parmi les offres",
        "Récupérer la commande chez le pâtissier",
        "Effectuer la livraison à l'adresse du client",
        "Recevoir le paiement après confirmation client",
      ],
    },
  ];
  return (
    <SlideWrap>
      <div className="w-full max-w-6xl mx-auto">
        <div className="w-full">
          <Tag>// SLIDE 06 · ACTEURS & RÔLES</Tag>
          <H sub="Les utilisateurs et leurs permissions">Acteurs du <span style={{ color: C.cyan }}>Système</span></H>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {actors.map((actor, i) => (
              <motion.div key={i} {...a(i + 2)} className="h-full">
                <div className="flex flex-col rounded-xl p-6 h-full"
                  style={{ background: C.card, border: `1px solid ${actor.color}30`, borderLeft: `4px solid ${actor.color}` }}>
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-5 pb-4" style={{ borderBottom: `1px solid ${actor.color}20` }}>
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0"
                      style={{ background: `${actor.color}18` }}>
                      {actor.icon}
                    </div>
                    <div>
                      <p className="font-black text-lg leading-tight" style={{ color: actor.color, fontFamily: "var(--font-mono)" }}>{actor.name}</p>
                      <Chip label="Rôle système" color={actor.color} />
                    </div>
                  </div>

                  {/* Permissions */}
                  <ul className="space-y-2.5">
                    {actor.can.map((c, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-xs" style={{ color: C.muted }}>
                        <span className="mt-0.5 shrink-0 font-bold" style={{ color: actor.color }}>✓</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}

// ─────────────────────────────────────────────
// SLIDE 7 — FONCTIONNALITÉS PRINCIPALES
// ─────────────────────────────────────────────
function Slide07() {
  const features = [
    {
      icon: "🧁", title: "Gestion des produits", color: "#E91E63",
      items: ["Création de produits avec photos", "Prix, description, ingrédients", "Catégories (gâteau, macaron, tarte…)", "Activation / désactivation produit"],
    },
    {
      icon: "📦", title: "Système de commandes", color: C.blue,
      items: ["Commande personnalisable (couleur, message)", "Workflow complet : pending → delivered", "Suivi en temps réel (WebSocket)", "Historique des commandes par rôle"],
    },
    {
      icon: "🔐", title: "Comptes utilisateurs", color: "#F59E0B",
      items: ["Inscription & connexion JWT", "Refresh token (HttpOnly cookie)", "Profil avec photo (MinIO S3)", "Wallet intégré (recharge / débit)"],
    },
    {
      icon: "⭐", title: "Notations & avis", color: "#47A248",
      items: ["Note de 1 à 5 étoiles", "Moyenne calculée automatiquement", "Liker un produit ou un pâtissier", "S'abonner à un pâtissier"],
    },
  ];
  return (
    <SlideWrap>
      <div className="w-full max-w-6xl mx-auto">
        <div className="w-full">
          <Tag>// SLIDE 07 · FONCTIONNALITÉS</Tag>
          <H sub="Les 4 modules principaux de la plateforme">Fonctionnalités <span style={{ color: C.cyan }}>Principales</span></H>

          <div className="grid grid-cols-2 gap-5">
            {features.map((f, i) => (
              <motion.div key={i} {...a(i + 2)} className="h-full">
                <div className="flex flex-col gap-4 rounded-xl p-6 h-full"
                  style={{ background: C.card, border: `1px solid ${f.color}25`, borderLeft: `4px solid ${f.color}` }}>
                  <div className="flex items-center gap-3 pb-3" style={{ borderBottom: `1px solid ${f.color}20` }}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0"
                      style={{ background: `${f.color}15` }}>
                      {f.icon}
                    </div>
                    <p className="font-bold text-sm md:text-base" style={{ color: f.color }}>{f.title}</p>
                  </div>
                  <ul className="space-y-2">
                    {f.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs" style={{ color: C.muted }}>
                        <span className="shrink-0 mt-0.5 font-bold" style={{ color: f.color }}>→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}

// ─────────────────────────────────────────────
// SLIDE 8 — USER FLOW (SCÉNARIO)
// ─────────────────────────────────────────────
function Slide08() {
  const steps = [
    { n: "01", icon: "🔍", actor: "Client", action: "Parcourt le catalogue", detail: "Filtre par ville, catégorie, prix ou note", color: C.blue },
    { n: "02", icon: "🎂", actor: "Client", action: "Sélectionne un produit", detail: "Voit les photos, prix, avis, pâtissier", color: C.blue },
    { n: "03", icon: "✏️", actor: "Client", action: "Personnalise & commande", detail: "Couleur, message, garniture, adresse livraison", color: C.cyan },
    { n: "04", icon: "💳", actor: "Client", action: "Paie en ligne", detail: "Stripe sécurisé — montant bloqué (escrow)", color: "#F59E0B" },
    { n: "05", icon: "✅", actor: "Pâtissier", action: "Accepte la commande", detail: "Reçoit une notification, confirme et prépare", color: "#E91E63" },
    { n: "06", icon: "🛵", actor: "Livreur", action: "Propose un prix de livraison", detail: "Modèle InDrive — client choisit son livreur", color: "#FF6600" },
    { n: "07", icon: "📬", actor: "Livreur", action: "Effectue la livraison", detail: "Se rend à l'adresse et remet la commande", color: "#FF6600" },
    { n: "08", icon: "🎉", actor: "Client", action: "Confirme & note", detail: "Confirme réception → paiement libéré → note", color: "#47A248" },
  ];
  return (
    <SlideWrap>
      <div className="w-full max-w-6xl mx-auto">
        <div className="w-full">
          <Tag>// SLIDE 08 · SCÉNARIO UTILISATEUR</Tag>
          <H sub="De la navigation jusqu'à la livraison">User Flow — <span style={{ color: C.cyan }}>Commande Complète</span></H>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {steps.map((step, i) => (
              <motion.div key={i} {...a(i + 2)} className="h-full">
                <div className="flex flex-col gap-2 rounded-xl p-5 h-full"
                  style={{ background: C.card, border: `1px solid ${step.color}25`, borderLeft: `4px solid ${step.color}` }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-black text-xs" style={{ color: step.color }}>{step.n}</span>
                    <Chip label={step.actor} color={step.color} />
                  </div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: `${step.color}15` }}>
                    {step.icon}
                  </div>
                  <p className="font-bold text-xs mt-1" style={{ color: C.text }}>{step.action}</p>
                  <p className="text-[10px] leading-relaxed" style={{ color: C.muted }}>{step.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}

// ─────────────────────────────────────────────
// SLIDE 9 — UML DIAGRAMME DE CLASSES
// ─────────────────────────────────────────────
function Slide09() {
  return (
    <SlideWrap>
      <div className="w-full max-w-7xl mx-auto">
        <div className="w-full">
          <Tag>// SLIDE 09 · UML</Tag>
          <H sub="Principales classes et leurs relations">Diagramme de <span style={{ color: C.cyan }}>Classes</span></H>

          <motion.div {...a(2)} className="w-full overflow-hidden rounded-xl" style={{ border: `1px solid ${C.border}`, background: C.card }}>
            <svg viewBox="0 0 900 380" className="w-full" style={{ fontFamily: "var(--font-mono)" }}>
              <defs>
                <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill={C.muted} />
                </marker>
                <marker id="arrow-inh" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
                  <polygon points="0,0 10,5 0,10" fill="none" stroke={C.cyan} strokeWidth="1.5" />
                </marker>
              </defs>

              {/* ── User (base) ── */}
              <g>
                <rect x="340" y="10" width="160" height="100" rx="6" fill="#0A1628" stroke={C.cyan} strokeWidth="1.5" />
                <rect x="340" y="10" width="160" height="24" rx="6" fill={`${C.cyan}22`} />
                <text x="420" y="26" textAnchor="middle" fontSize="11" fontWeight="bold" fill={C.cyan}>User</text>
                {["id: string", "name: string", "email: string", "password: string", "role: enum", "phone: string"].map((f, i) => (
                  <text key={i} x="350" y={48 + i * 11} fontSize="9" fill={C.muted}>{f}</text>
                ))}
              </g>

              {/* ── Client ── */}
              <g>
                <rect x="30" y="155" width="150" height="65" rx="6" fill="#0A1628" stroke={C.blue} strokeWidth="1.5" />
                <rect x="30" y="155" width="150" height="22" rx="6" fill={`${C.blue}22`} />
                <text x="105" y="170" textAnchor="middle" fontSize="11" fontWeight="bold" fill={C.blue}>Client</text>
                {["walletBalance: number", "ordersIds: string[]"].map((f, i) => (
                  <text key={i} x="40" y={190 + i * 12} fontSize="9" fill={C.muted}>{f}</text>
                ))}
              </g>

              {/* ── Patissiere ── */}
              <g>
                <rect x="210" y="155" width="160" height="75" rx="6" fill="#0A1628" stroke="#E91E63" strokeWidth="1.5" />
                <rect x="210" y="155" width="160" height="22" rx="6" fill="#E91E6322" />
                <text x="290" y="170" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#E91E63">Patissiere</text>
                {["bio: string", "earnings: number", "followersCount: number", "ratingAverage: float"].map((f, i) => (
                  <text key={i} x="220" y={190 + i * 12} fontSize="9" fill={C.muted}>{f}</text>
                ))}
              </g>

              {/* ── Livreur ── */}
              <g>
                <rect x="400" y="155" width="155" height="80" rx="6" fill="#0A1628" stroke="#FF6600" strokeWidth="1.5" />
                <rect x="400" y="155" width="155" height="22" rx="6" fill="#FF660022" />
                <text x="477" y="170" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#FF6600">Livreur</text>
                {["vehicleType: string", "deliveryZone: string", "earnings: number", "ratingAverage: float"].map((f, i) => (
                  <text key={i} x="410" y={190 + i * 12} fontSize="9" fill={C.muted}>{f}</text>
                ))}
              </g>

              {/* ── Product ── */}
              <g>
                <rect x="580" y="10" width="155" height="100" rx="6" fill="#0A1628" stroke="#47A248" strokeWidth="1.5" />
                <rect x="580" y="10" width="155" height="24" rx="6" fill="#47A24822" />
                <text x="657" y="26" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#47A248">Product</text>
                {["id: string", "title: string", "price: number", "images: string[]", "patissiereId: string", "categoryId: string"].map((f, i) => (
                  <text key={i} x="590" y={48 + i * 11} fontSize="9" fill={C.muted}>{f}</text>
                ))}
              </g>

              {/* ── Order ── */}
              <g>
                <rect x="580" y="155" width="155" height="97" rx="6" fill="#0A1628" stroke="#FF6600" strokeWidth="1.5" />
                <rect x="580" y="155" width="155" height="22" rx="6" fill="#FF660022" />
                <text x="657" y="170" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#FF6600">Order</text>
                {["id: string", "clientId: string", "patissiereId: string", "livreurId: string", "status: enum", "totalPrice: number", "createdAt: Date"].map((f, i) => (
                  <text key={i} x="590" y={190 + i * 11} fontSize="9" fill={C.muted}>{f}</text>
                ))}
              </g>

              {/* ── OrderItem ── */}
              <g>
                <rect x="760" y="155" width="130" height="75" rx="6" fill="#0A1628" stroke="#FF6600" strokeWidth="1" strokeDasharray="4" />
                <rect x="760" y="155" width="130" height="22" rx="6" fill="#FF660015" />
                <text x="825" y="170" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#FF6600">OrderItem</text>
                {["orderId: string", "productId: string", "quantity: number", "customization: obj"].map((f, i) => (
                  <text key={i} x="768" y={190 + i * 12} fontSize="9" fill={C.muted}>{f}</text>
                ))}
              </g>

              {/* ── Rating ── */}
              <g>
                <rect x="760" y="10" width="130" height="65" rx="6" fill="#0A1628" stroke="#FFD700" strokeWidth="1.5" />
                <rect x="760" y="10" width="130" height="22" rx="6" fill="#FFD70022" />
                <text x="825" y="26" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#FFD700">Rating</text>
                {["fromUserId: string", "toUserId: string", "stars: number(1-5)"].map((f, i) => (
                  <text key={i} x="768" y={48 + i * 12} fontSize="9" fill={C.muted}>{f}</text>
                ))}
              </g>

              {/* ── Inheritance: User → Client, Patissiere, Livreur ── */}
              {/* User → Client */}
              <line x1="390" y1="110" x2="105" y2="155" stroke={C.cyan} strokeWidth="1.5" strokeDasharray="6,3" markerEnd="url(#arrow-inh)" />
              {/* User → Patissiere */}
              <line x1="400" y1="110" x2="290" y2="155" stroke={C.cyan} strokeWidth="1.5" strokeDasharray="6,3" markerEnd="url(#arrow-inh)" />
              {/* User → Livreur */}
              <line x1="450" y1="110" x2="477" y2="155" stroke={C.cyan} strokeWidth="1.5" strokeDasharray="6,3" markerEnd="url(#arrow-inh)" />

              {/* User → Product (Patissiere owns products) */}
              <line x1="500" y1="55" x2="580" y2="55" stroke={C.muted} strokeWidth="1" markerEnd="url(#arrow)" />
              <text x="520" y="48" fontSize="8" fill={C.muted}>1..*</text>

              {/* Order → OrderItem */}
              <line x1="735" y1="200" x2="760" y2="200" stroke={C.muted} strokeWidth="1" markerEnd="url(#arrow)" />
              <text x="740" y="193" fontSize="8" fill={C.muted}>1..*</text>

              {/* Order → User (clientId) */}
              <line x1="640" y1="155" x2="475" y2="110" stroke={C.muted} strokeWidth="1" markerEnd="url(#arrow)" />

              {/* Order → Livreur (livreurId) */}
              <line x1="580" y1="215" x2="555" y2="215" stroke="#FF6600" strokeWidth="1" strokeDasharray="3,2" markerEnd="url(#arrow)" />

              {/* Rating → User */}
              <line x1="760" y1="48" x2="500" y2="48" stroke={C.muted} strokeWidth="1" markerEnd="url(#arrow)" />

              {/* Legend */}
              <line x1="20" y1="350" x2="60" y2="350" stroke={C.cyan} strokeWidth="1.5" strokeDasharray="6,3" />
              <text x="65" y="354" fontSize="8" fill={C.muted}>Héritage</text>
              <line x1="120" y1="350" x2="160" y2="350" stroke={C.muted} strokeWidth="1" markerEnd="url(#arrow)" />
              <text x="165" y="354" fontSize="8" fill={C.muted}>Association</text>
            </svg>
          </motion.div>
        </div>
      </div>
    </SlideWrap>
  );
}

// ─────────────────────────────────────────────
// SLIDE 10 — UML USE CASE
// ─────────────────────────────────────────────
function Slide10() {
  return (
    <SlideWrap>
      <div className="w-full max-w-7xl mx-auto">
        <div className="w-full">
          <Tag>// SLIDE 10 · UML USE CASE</Tag>
          <H sub="Interactions entre acteurs et fonctionnalités">Diagramme de <span style={{ color: C.cyan }}>Cas d&apos;Utilisation</span></H>

          <motion.div {...a(2)} className="w-full rounded-xl overflow-hidden" style={{ border: `1px solid ${C.border}`, background: C.card }}>
            <svg viewBox="0 0 900 370" className="w-full" style={{ fontFamily: "var(--font-mono)" }}>
              {/* System boundary */}
              <rect x="160" y="20" width="590" height="330" rx="8" fill="none" stroke={C.border} strokeWidth="1.5" strokeDasharray="6,3" />
              <text x="175" y="38" fontSize="11" fill={C.muted} fontStyle="italic">«système» MaCake</text>

              {/* ── ACTORS ── */}
              {/* Client */}
              <circle cx="60" cy="100" r="18" fill="none" stroke={C.blue} strokeWidth="1.5" />
              <line x1="60" y1="118" x2="60" y2="155" stroke={C.blue} strokeWidth="1.5" />
              <line x1="35" y1="135" x2="85" y2="135" stroke={C.blue} strokeWidth="1.5" />
              <line x1="60" y1="155" x2="40" y2="180" stroke={C.blue} strokeWidth="1.5" />
              <line x1="60" y1="155" x2="80" y2="180" stroke={C.blue} strokeWidth="1.5" />
              <text x="60" y="196" textAnchor="middle" fontSize="10" fontWeight="bold" fill={C.blue}>Client</text>

              {/* Pâtissier */}
              <circle cx="60" cy="275" r="18" fill="none" stroke="#E91E63" strokeWidth="1.5" />
              <line x1="60" y1="293" x2="60" y2="330" stroke="#E91E63" strokeWidth="1.5" />
              <line x1="35" y1="310" x2="85" y2="310" stroke="#E91E63" strokeWidth="1.5" />
              <line x1="60" y1="330" x2="40" y2="353" stroke="#E91E63" strokeWidth="1.5" />
              <line x1="60" y1="330" x2="80" y2="353" stroke="#E91E63" strokeWidth="1.5" />
              <text x="60" y="366" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#E91E63">Pâtissier</text>

              {/* Livreur */}
              <circle cx="860" cy="240" r="18" fill="none" stroke="#FF6600" strokeWidth="1.5" />
              <line x1="860" y1="258" x2="860" y2="295" stroke="#FF6600" strokeWidth="1.5" />
              <line x1="835" y1="275" x2="885" y2="275" stroke="#FF6600" strokeWidth="1.5" />
              <line x1="860" y1="295" x2="840" y2="318" stroke="#FF6600" strokeWidth="1.5" />
              <line x1="860" y1="295" x2="880" y2="318" stroke="#FF6600" strokeWidth="1.5" />
              <text x="860" y="333" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#FF6600">Livreur</text>

              {/* ── USE CASES ── */}
              {[
                // Client use cases
                { x: 310, y: 55,  label: "S'inscrire / Se connecter",   actor: "client" },
                { x: 310, y: 100, label: "Parcourir le catalogue",       actor: "client" },
                { x: 310, y: 145, label: "Passer une commande",          actor: "client" },
                { x: 310, y: 190, label: "Payer en ligne (Stripe)",      actor: "client" },
                { x: 310, y: 235, label: "Choisir son livreur",          actor: "client" },
                { x: 310, y: 280, label: "Confirmer la livraison",       actor: "client" },
                // Pâtissier use cases
                { x: 590, y: 70,  label: "Gérer ses produits",           actor: "pati" },
                { x: 590, y: 120, label: "Accepter la commande",         actor: "pati" },
                { x: 590, y: 170, label: "Marquer commande prête",       actor: "pati" },
                // Livreur use cases
                { x: 590, y: 240, label: "Voir commandes disponibles",   actor: "livreur" },
                { x: 590, y: 288, label: "Proposer un prix livraison",   actor: "livreur" },
                { x: 590, y: 333, label: "Effectuer la livraison",       actor: "livreur" },
              ].map((uc, i) => {
                const color = uc.actor === "client" ? C.blue : uc.actor === "pati" ? "#E91E63" : "#FF6600";
                return (
                  <g key={i}>
                    <ellipse cx={uc.x} cy={uc.y} rx="110" ry="16" fill={`${color}10`} stroke={color} strokeWidth="1" />
                    <text x={uc.x} y={uc.y + 4} textAnchor="middle" fontSize="9" fill={C.text}>{uc.label}</text>
                  </g>
                );
              })}

              {/* ── ASSOCIATION LINES ── */}
              {/* Client → his use cases */}
              {[55, 100, 145, 190, 235, 280].map((y, i) => (
                <line key={i} x1="78" y1="100" x2="200" y2={y} stroke={`${C.blue}50`} strokeWidth="1" />
              ))}
              {/* Pâtissier → his use cases */}
              {[70, 120, 170].map((y, i) => (
                <line key={i} x1="78" y1="275" x2="480" y2={y} stroke="#E91E6350" strokeWidth="1" />
              ))}
              {/* Livreur → his use cases */}
              {[240, 288, 333].map((y, i) => (
                <line key={i} x1="842" y1="240" x2="700" y2={y} stroke="#FF660050" strokeWidth="1" />
              ))}

              {/* Note */}
              <text x="310" y="355" textAnchor="middle" fontSize="8" fill={C.muted} fontStyle="italic">
                «include» Authentification
              </text>
            </svg>
          </motion.div>
        </div>
      </div>
    </SlideWrap>
  );
}

// ─────────────────────────────────────────────
// SLIDE 11 — TECHNOLOGIES
// ─────────────────────────────────────────────
function Slide11() {
  const techs = [
    {
      icon: "🏗️", name: "NestJS 11", badge: "Backend", color: "#E0234E",
      why: "Framework TypeScript modulaire avec support natif microservices TCP et RabbitMQ.",
    },
    {
      icon: "🍃", name: "MongoDB", badge: "Database", color: "#47A248",
      why: "Schéma flexible par service. Pattern database-per-service pour isolation totale.",
    },
    {
      icon: "⚡", name: "Redis", badge: "Cache & Registry", color: "#DC382D",
      why: "Service discovery custom (clé/valeur JSON), cache sessions JWT et notations.",
    },
    {
      icon: "🐇", name: "RabbitMQ", badge: "Messaging", color: "#FF6600",
      why: "Communication asynchrone inter-services via queues durables (orders_queue, auth_queue…).",
    },
    {
      icon: "🐳", name: "Docker Compose", badge: "DevOps", color: "#2496ED",
      why: "Orchestration de 9 containers sur un réseau bridge macake-network. Reproducible.",
    },
    {
      icon: "📱", name: "Expo / React Native", badge: "Mobile", color: "#7B68EE",
      why: "Cross-platform iOS & Android. expo-router, Redux Toolkit, nativewind, socket.io-client.",
    },
    {
      icon: "💳", name: "Stripe", badge: "Paiement", color: "#635BFF",
      why: "PaymentIntents + escrow system. Support MAD (Dirham marocain). Webhooks sécurisés.",
    },
    {
      icon: "📁", name: "MinIO S3", badge: "Stockage", color: "#C72D54",
      why: "S3-compatible self-hosted. Stockage photos produits et profils utilisateurs.",
    },
  ];
  return (
    <SlideWrap>
      <div className="w-full max-w-6xl mx-auto">
        <div className="w-full">
          <Tag>// SLIDE 11 · TECHNOLOGIES</Tag>
          <H sub="Stack technique et justification des choix">Technologies <span style={{ color: C.cyan }}>Utilisées</span></H>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {techs.map((t, i) => (
              <motion.div key={i} {...a(i + 2)} className="h-full">
                <div className="flex flex-col gap-3 rounded-xl p-5 h-full"
                  style={{ background: C.card, border: `1px solid ${t.color}25`, borderLeft: `4px solid ${t.color}` }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                      style={{ background: `${t.color}15` }}>
                      {t.icon}
                    </div>
                    <div>
                      <p className="font-bold text-xs md:text-sm" style={{ color: t.color }}>{t.name}</p>
                      <Chip label={t.badge} color={t.color} />
                    </div>
                  </div>
                  <p className="text-[10px] md:text-[11px] leading-relaxed" style={{ color: C.muted }}>{t.why}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}

// ─────────────────────────────────────────────
// SLIDE 12 — ARCHITECTURE
// ─────────────────────────────────────────────
function Slide12() {
  return (
    <SlideWrap>
      <div className="w-full max-w-6xl mx-auto">
        <div className="w-full">
          <Tag>// SLIDE 12 · ARCHITECTURE</Tag>
          <H sub="Vue globale du système et rôle du Gateway + Service Discovery">Architecture <span style={{ color: C.cyan }}>du Système</span></H>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
            {/* Col 1 — Architecture diagram */}
            <motion.div {...a(2)} className="md:col-span-2">
              <div className="rounded-xl p-5"
                style={{ background: C.card, border: `1px solid ${C.border}`, borderLeft: `4px solid ${C.cyan}` }}>
                <p className="text-[10px] font-mono mb-3" style={{ color: C.muted }}>// Architecture microservices globale</p>
                <svg viewBox="0 0 560 260" className="w-full" style={{ fontFamily: "var(--font-mono)" }}>
                  {/* Mobile client */}
                  <rect x="5" y="100" width="80" height="50" rx="6" fill="#0D1F3C" stroke={C.blue} strokeWidth="1.5" />
                  <text x="45" y="122" textAnchor="middle" fontSize="9" fill={C.blue}>📱 Mobile</text>
                  <text x="45" y="136" textAnchor="middle" fontSize="8" fill={C.muted}>Expo App</text>

                  {/* Arrow to Gateway */}
                  <line x1="85" y1="125" x2="125" y2="125" stroke={C.blue} strokeWidth="1.5" markerEnd="url(#arrow2)" />
                  <text x="105" y="118" textAnchor="middle" fontSize="7" fill={C.muted}>HTTP</text>

                  {/* API Gateway */}
                  <rect x="125" y="80" width="100" height="90" rx="8" fill="#0D1F3C" stroke={C.cyan} strokeWidth="2" />
                  <text x="175" y="102" textAnchor="middle" fontSize="9" fontWeight="bold" fill={C.cyan}>🌐 Gateway</text>
                  <text x="175" y="116" textAnchor="middle" fontSize="7" fill={C.muted}>Port 3000</text>
                  <text x="175" y="128" textAnchor="middle" fontSize="7" fill={C.muted}>JWT Auth</text>
                  <text x="175" y="140" textAnchor="middle" fontSize="7" fill={C.muted}>Rate Limit</text>
                  <text x="175" y="152" textAnchor="middle" fontSize="7" fill={C.muted}>TCP Forward</text>

                  {/* Redis */}
                  <rect x="125" y="195" width="100" height="40" rx="6" fill="#0D1F3C" stroke="#DC382D" strokeWidth="1.5" />
                  <text x="175" y="210" textAnchor="middle" fontSize="9" fill="#DC382D">⚡ Redis</text>
                  <text x="175" y="225" textAnchor="middle" fontSize="7" fill={C.muted}>Service Registry</text>
                  {/* Gateway → Redis */}
                  <line x1="175" y1="170" x2="175" y2="195" stroke="#DC382D" strokeWidth="1" strokeDasharray="4,2" />

                  {/* TCP arrow */}
                  <line x1="225" y1="125" x2="265" y2="125" stroke={C.muted} strokeWidth="1.5" markerEnd="url(#arrow2)" />
                  <text x="245" y="118" textAnchor="middle" fontSize="7" fill={C.muted}>TCP</text>

                  {/* Services block */}
                  {[
                    { name: "auth-service", port: ":3001", color: C.blue, y: 45 },
                    { name: "catalog-service", port: ":3002", color: "#47A248", y: 95 },
                    { name: "order-service", port: ":3003", color: "#FF6600", y: 145 },
                    { name: "payment-service", port: ":3005", color: "#635BFF", y: 195 },
                    { name: "notation-service", port: ":3006", color: "#FFD700", y: 245 },
                  ].map((svc) => (
                    <g key={svc.name}>
                      <rect x="265" y={svc.y - 18} width="130" height="32" rx="5" fill="#0D1F3C" stroke={svc.color} strokeWidth="1" />
                      <text x="330" y={svc.y - 4} textAnchor="middle" fontSize="8" fontWeight="bold" fill={svc.color}>{svc.name}</text>
                      <text x="330" y={svc.y + 8} textAnchor="middle" fontSize="7" fill={C.muted}>{svc.port} · MongoDB</text>
                      {/* Line from gateway to service */}
                      <line x1="265" y1="125" x2="265" y2={svc.y} stroke={`${svc.color}40`} strokeWidth="1" />
                    </g>
                  ))}

                  {/* RabbitMQ */}
                  <rect x="415" y="160" width="100" height="40" rx="6" fill="#0D1F3C" stroke="#FF6600" strokeWidth="1.5" />
                  <text x="465" y="175" textAnchor="middle" fontSize="9" fill="#FF6600">🐇 RabbitMQ</text>
                  <text x="465" y="189" textAnchor="middle" fontSize="7" fill={C.muted}>Async Queues</text>
                  <line x1="395" y1="180" x2="415" y2="180" stroke="#FF660060" strokeWidth="1" strokeDasharray="3,2" />

                  {/* Arrow defs */}
                  <defs>
                    <marker id="arrow2" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
                      <path d="M0,0 L0,6 L7,3 z" fill={C.muted} />
                    </marker>
                  </defs>

                  {/* Labels */}
                  <text x="5" y="260" fontSize="7" fill={C.muted}>① Client fait une requête HTTP</text>
                  <text x="5" y="270" fontSize="7" fill={C.muted}>② Gateway vérifie JWT, lit Redis, forward en TCP</text>
                  <text x="5" y="280" fontSize="7" fill={C.muted}>③ Service répond → Gateway retransmet en HTTP</text>
                </svg>
              </div>
            </motion.div>

            {/* Col 2 — Service Discovery explanation */}
            <div className="space-y-3">
              <motion.div {...a(3)}>
                <div className="rounded-xl p-5"
                  style={{ background: C.card, border: `1px solid ${C.cyan}30`, borderLeft: `4px solid ${C.cyan}` }}>
                  <p className="text-[10px] font-mono font-bold mb-3" style={{ color: C.cyan }}>
                    🔍 Service Discovery Custom
                  </p>
                  <div className="space-y-2 text-[10px]" style={{ color: C.muted }}>
                    <p>① Chaque service <span style={{ color: C.text }}>s&apos;enregistre dans Redis</span> au démarrage :</p>
                    <div className="rounded-lg p-3" style={{ background: "#020810", fontFamily: "var(--font-mono)", fontSize: "9px", color: "#7FDBFF" }}>
                      <div><span style={{ color: "#FF79C6" }}>KEY</span>: serviceKey:s1</div>
                      <div>{"{ host, port, endpoints }"}</div>
                    </div>
                    <p>② Gateway <span style={{ color: C.text }}>lit Redis</span> pour localiser le service.</p>
                    <p>③ Sélection <span style={{ color: C.text }}>aléatoire</span> si plusieurs instances.</p>
                    <p>④ <span style={{ color: "#47A248" }}>✓ Pas de Consul/Eureka</span> — 100% custom NestJS + Redis.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div {...a(4)}>
                <div className="rounded-xl p-5"
                  style={{ background: C.card, border: `1px solid #FF660030`, borderLeft: `4px solid #FF6600` }}>
                  <p className="text-[10px] font-mono font-bold mb-3" style={{ color: "#FF6600" }}>
                    🐇 Communication Services
                  </p>
                  <div className="space-y-2.5 text-[10px]" style={{ color: C.muted }}>
                    <div className="flex items-center gap-2">
                      <Chip label="TCP" color={C.blue} />
                      <span>Gateway ↔ Services (sync)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Chip label="RabbitMQ" color="#FF6600" />
                      <span>Services ↔ Services (async)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Chip label="WebSocket" color="#47A248" />
                      <span>Temps réel → Client</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div {...a(5)}>
                <div className="rounded-xl p-5"
                  style={{ background: C.card, border: `1px solid #F59E0B30`, borderLeft: `4px solid #F59E0B` }}>
                  <p className="text-[10px] font-mono font-bold mb-3" style={{ color: "#F59E0B" }}>
                    🐳 Docker — 9 containers
                  </p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {["Gateway", "Auth", "Catalog", "Order", "Payment", "Notation", "MongoDB", "Redis", "RabbitMQ"].map((s, i) => (
                      <span key={i} className="text-[9px] px-2 py-1 rounded-lg" style={{ background: "rgba(30,144,255,0.08)", color: C.muted, border: `1px solid ${C.border}` }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrap>
  );
}

// ─────────────────────────────────────────────
// SLIDE REGISTRY — exactly 12 slides
// ─────────────────────────────────────────────
const SLIDES = [
  { id: 1, label: "Titre", component: Slide01 },
  { id: 2, label: "Introduction", component: Slide02 },
  { id: 3, label: "Problématique", component: Slide03 },
  { id: 4, label: "Objectifs", component: Slide04 },
  { id: 5, label: "Solution", component: Slide05 },
  { id: 6, label: "Acteurs & Rôles", component: Slide06 },
  { id: 7, label: "Fonctionnalités", component: Slide07 },
  { id: 8, label: "User Flow", component: Slide08 },
  { id: 9, label: "UML — Classes", component: Slide09 },
  { id: 10, label: "UML — Use Case", component: Slide10 },
  { id: 11, label: "Technologies", component: Slide11 },
  { id: 12, label: "Architecture", component: Slide12 },
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
      if (["ArrowRight", "ArrowDown", " "].includes(e.key)) { e.preventDefault(); next(); }
      else if (["ArrowLeft", "ArrowUp"].includes(e.key)) { e.preventDefault(); prev(); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [next, prev]);

  const Active = SLIDES[cur].component;

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none" style={{ background: C.bg }}>
      {/* Slide */}
      <AnimatePresence initial={false} custom={dir} mode="wait">
        <motion.div key={cur} custom={dir} variants={slideVariants}
          initial="enter" animate="center" exit="exit" transition={tx}
          className="absolute inset-0">
          <Active />
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 z-50" style={{ background: "rgba(30,144,255,0.08)" }}>
        <motion.div className="h-full" style={{ background: `linear-gradient(90deg, ${C.blue}, ${C.cyan})` }}
          animate={{ width: `${((cur + 1) / SLIDES.length) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }} />
      </div>

      {/* Slide label */}
      <div className="absolute top-3 left-5 z-50">
        <div className="px-3 py-1 rounded-md text-[10px] font-mono" style={{ background: "rgba(10,22,40,0.8)", color: C.muted, border: `1px solid ${C.border}` }}>
          {SLIDES[cur].label}
        </div>
      </div>

      {/* Counter */}
      <div className="absolute top-3 right-5 z-50">
        <div className="px-3 py-1 rounded-md text-[10px] font-mono font-bold" style={{ background: "rgba(10,22,40,0.8)", color: C.blue, border: `1px solid ${C.border}` }}>
          {cur + 1} / {SLIDES.length}
        </div>
      </div>

      {/* Prev */}
      {cur > 0 && (
        <button onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-50 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ background: "rgba(10,22,40,0.8)", border: `1px solid ${C.border}`, color: C.muted }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      {/* Next */}
      {cur < SLIDES.length - 1 && (
        <button onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-50 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ background: "rgba(10,22,40,0.8)", border: `1px solid ${C.blue}40`, color: C.blue }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className={`dot ${i === cur ? "active" : ""}`}
            aria-label={`Slide ${i + 1}`} />
        ))}
      </div>

      {/* Hint */}
      {cur === 0 && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 text-[10px] font-mono whitespace-nowrap"
          style={{ color: "rgba(123,158,201,0.35)" }}>
          ← → naviguer · Espace avancer
        </motion.p>
      )}
    </div>
  );
}
