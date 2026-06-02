"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
    Ticket,
    CreditCard,
    MapPin,
    BarChart3,
    MessageSquare,
    Network,
    Map,
    Mic,
    ArrowRight,
    Users,
    TrendingUp,
    Globe,
    Zap,
    CheckCircle2,
    Bus,
    Train,
    Navigation,
    Smartphone
} from "lucide-react";

export default function IEcosystemPage() {
    const products = [
        {
            icon: Ticket,
            name: "i-ticket",
            tagline: "L'app que les citoyens utilisent",
            description: "Application de mobilité urbaine offrant l'interopérabilité totale : un seul ticket pour tous les réseaux (BRT, TATA, DDD, TER)",
            isMain: true,
            link: "/products/i-ticket"
        },
        {
            icon: CreditCard,
            name: "i-carte",
            tagline: "La carte virtuelle interopérable",
            description: "Portefeuille numérique unifié qui élimine le paiement en espèces. Rechargeable via Wave & Orange Money",
            link: "/products/i-carte"
        },
        {
            icon: MapPin,
            name: "i-collect",
            tagline: "Cartographie participative",
            description: "Application mobile qui transforme chaque citoyen en collecteur de données certifié pour enregistrer les arrêts et lignes de bus",
            link: "/products/i-collect"
        },
        {
            icon: BarChart3,
            name: "i-model",
            tagline: "IA pour itinéraires multimodaux",
            description: "Modèle d'IA (GNN + A*) qui calcule en une fraction de seconde les trois meilleurs itinéraires possibles",
            link: "/products/i-model"
        },
        {
            icon: Mic,
            name: "i-wolof",
            tagline: "Assistant vocal en wolof",
            description: "Permet aux usagers de demander leur itinéraire en wolof naturel. Inclusion pour 100% des Sénégalais",
            link: "/products/i-wolof"
        },
        {
            icon: Map,
            name: "i-maps",
            tagline: "Carte interactive open source",
            description: "Vision dynamique du Réseau de Transport Commun en temps réel, mise à jour quotidiennement depuis i-collect",
            link: "/products/i-maps"
        },
        {
            icon: Network,
            name: "i-reseaux",
            tagline: "Plateforme unifiée des réseaux",
            description: "Unifie les données des quatre réseaux pour une interopérabilité 100% et planification multimodale",
            link: "/products/i-reseaux"
        },
        {
            icon: MessageSquare,
            name: "i-chatbot",
            tagline: "Assistance IA en temps réel",
            description: "Chatbot alimenté à l'IA pour fournir de l'aide et des réponses en temps réel sur l'écosystème i",
            link: "/products/i-chatbot"
        }
    ];

    return (
        <main className="min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden mt-16">
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand-navy via-brand-teal to-brand-navy">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
                </div>

                <div className="container relative z-10 px-4 mx-auto text-center py-20">
                    <div className="max-w-6xl mx-auto space-y-12">
                        <div className="inline-block px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-4">
                            Mobilité Urbaine • By Art'Beau-Rescence
                        </div>

                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6">
                            i-ecosystem
                        </h1>

                        <p className="text-3xl md:text-4xl text-white/95 max-w-4xl mx-auto leading-relaxed font-light">
                            La solution de mobilité urbaine intelligente pour Dakar
                        </p>

                        <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                            Un écosystème de produits intégrés qui transforme la fragmentation en un réseau intelligent piloté par la donnée
                        </p>

                        {/* Key Problems Solved */}
                        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-12">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <CheckCircle2 className="w-12 h-12 text-white mb-4 mx-auto" />
                                <h3 className="text-xl font-bold text-white mb-2">Interopérabilité totale</h3>
                                <p className="text-white/80">Un seul ticket pour tous les réseaux (BRT, TATA, DDD, TER)</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <CheckCircle2 className="w-12 h-12 text-white mb-4 mx-auto" />
                                <h3 className="text-xl font-bold text-white mb-2">Multimodalité</h3>
                                <p className="text-white/80">Recherche d'itinéraire combinant plusieurs moyens de transport</p>
                            </div>
                        </div>

                        <div className="pt-8">
                            <Link href="/products/i-ticket">
                                <Button size="lg" className="bg-white text-brand-teal hover:bg-gray-100 px-12 py-8 text-xl font-bold">
                                    Découvrir i-ticket
                                    <ArrowRight className="ml-3 w-6 h-6" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Context Section */}
            <section className="py-20 bg-white">
                <div className="container px-4 mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-brand-teal to-brand-navy bg-clip-text text-transparent">
                            La Réalité de 4 Millions de Dakarois
                        </h2>
                        <p className="text-2xl text-muted-foreground">
                            La mobilité à Dakar est un défi quotidien majeur
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Congestion chronique", desc: "sur les routes", icon: "🚗" },
                            { title: "Croissance démographique", desc: "rapide", icon: "📈" },
                            { title: "Multiplication des opérateurs", desc: "sans coordination", icon: "🚌" },
                            { title: "Paiement majoritairement", desc: "en espèces", icon: "💵" }
                        ].map((problem, idx) => (
                            <div key={idx} className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200 text-center">
                                <div className="text-5xl mb-4">{problem.icon}</div>
                                <h3 className="text-lg font-bold text-brand-navy mb-2">{problem.title}</h3>
                                <p className="text-muted-foreground">{problem.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Problems */}
                    <div className="mt-16 bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-12 border-2 border-red-200">
                        <h3 className="text-3xl font-bold text-center mb-8 text-red-900">Problèmes Structurels Critiques</h3>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white rounded-2xl p-8 border-2 border-red-200">
                                <h4 className="text-2xl font-bold mb-4 text-red-800">❌ Pas d'interopérabilité</h4>
                                <p className="text-muted-foreground">Chaque réseau (BRT, TATA, DDD, TER) fonctionne de manière isolée avec son propre système de billetterie</p>
                            </div>
                            <div className="bg-white rounded-2xl p-8 border-2 border-red-200">
                                <h4 className="text-2xl font-bold mb-4 text-red-800">❌ Pas d'intermodalité</h4>
                                <p className="text-muted-foreground">Impossible de combiner plusieurs moyens de transport avec un seul ticket ou itinéraire</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* i-ticket at Center */}
            <section className="py-20 bg-gradient-to-br from-brand-teal/5 to-brand-navy/5">
                <div className="container px-4 mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-brand-teal to-brand-navy bg-clip-text text-transparent">
                            i-ticket : L'expérience utilisateur unifiée
                        </h2>
                        <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
                            C'est l'application que les citoyens utilisent quotidiennement
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-brand-teal">
                        <div className="grid md:grid-cols-2">
                            <div className="p-12 bg-gradient-to-br from-brand-teal to-brand-navy text-white">
                                <Ticket className="w-20 h-20 mb-6" />
                                <h3 className="text-4xl font-bold mb-6">i-ticket</h3>
                                <p className="text-xl mb-8 text-white/90">
                                    Application de mobilité urbaine multimodale et inclusive
                                </p>
                                <div className="space-y-4">
                                    {[
                                        "Un seul ticket pour tous les réseaux",
                                        "Recherche d'itinéraire optimisée",
                                        "Paiement digital avec i-carte",
                                        "Assistant vocal i-wolof",
                                        "Carte interactive i-maps"
                                    ].map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="p-12 flex items-center justify-center bg-gray-50">
                                <div className="text-center">
                                    <div className="w-48 h-96 mx-auto rounded-3xl bg-white shadow-2xl border-8 border-gray-800 flex items-center justify-center">
                                        <Smartphone className="w-24 h-24 text-brand-teal" />
                                    </div>
                                    <p className="mt-6 text-muted-foreground font-semibold">Application mobile iOS & Android</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/products/i-ticket">
                            <Button size="lg" className="px-12 py-7 text-xl font-bold">
                                En savoir plus sur i-ticket
                                <ArrowRight className="ml-3 w-6 h-6" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* All Products */}
            <section className="py-20 bg-white">
                <div className="container px-4 mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-brand-teal to-brand-navy bg-clip-text text-transparent">
                            8 Solutions Technologiques Intégrées
                        </h2>
                        <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
                            Un écosystème complet pour transformer la mobilité urbaine
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {products.map((product, idx) => (
                            <Link key={idx} href={product.link}>
                                <div className={`${product.isMain ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-brand-teal to-brand-navy text-white' : 'bg-gray-50'} rounded-2xl p-8 border-2 ${product.isMain ? 'border-brand-navy' : 'border-gray-200'} hover:border-brand-teal hover:shadow-xl transition-all group cursor-pointer`}>
                                    <product.icon className={`w-12 h-12 mb-4 ${product.isMain ? 'text-white' : 'text-brand-teal'}`} />
                                    <h3 className={`text-2xl font-bold mb-2 ${product.isMain ? 'text-white' : 'text-brand-navy'}`}>{product.name}</h3>
                                    <p className={`text-sm font-semibold mb-3 ${product.isMain ? 'text-white/80' : 'text-brand-teal'}`}>{product.tagline}</p>
                                    <p className={`${product.isMain ? 'text-white/90' : 'text-muted-foreground'}`}>{product.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* How They Work Together */}
            <section className="py-20 bg-gray-50">
                <div className="container px-4 mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-brand-teal to-brand-navy bg-clip-text text-transparent">
                            Architecture Technologique Souveraine
                        </h2>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-white rounded-3xl p-10 border-2 border-brand-teal shadow-xl">
                            <div className="flex items-start gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-teal to-brand-navy flex items-center justify-center flex-shrink-0">
                                    <span className="text-3xl font-bold text-white">1</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-3 text-brand-navy">i-collect collecte les données terrain</h3>
                                    <p className="text-lg text-muted-foreground">Les citoyens enregistrent les arrêts et lignes de bus pour obtenir des données précises</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-10 border-2 border-brand-teal shadow-xl">
                            <div className="flex items-start gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-teal to-brand-navy flex items-center justify-center flex-shrink-0">
                                    <span className="text-3xl font-bold text-white">2</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-3 text-brand-navy">i-model entraîne l'IA avec ces données</h3>
                                    <p className="text-lg text-muted-foreground">Le modèle GNN + A* calcule les meilleurs itinéraires multimodaux en temps réel</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-10 border-2 border-brand-teal shadow-xl">
                            <div className="flex items-start gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-teal to-brand-navy flex items-center justify-center flex-shrink-0">
                                    <span className="text-3xl font-bold text-white">3</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-3 text-brand-navy">i-reseaux unifie les 4 réseaux de transport</h3>
                                    <p className="text-lg text-muted-foreground">Interopérabilité 100% entre BRT, TATA, DDD et TER</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-brand-teal to-brand-navy rounded-3xl p-10 text-white border-2 border-brand-navy shadow-2xl">
                            <div className="flex items-start gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center flex-shrink-0">
                                    <Ticket className="w-10 h-10 text-brand-teal" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold mb-3">i-ticket offre l'expérience finale</h3>
                                    <p className="text-xl text-white/90">Intègre i-model, i-carte, i-maps, i-wolof et i-chatbot pour une expérience de mobilité simplifiée et sûre</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact */}
            <section className="py-20 bg-white">
                <div className="container px-4 mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-brand-teal to-brand-navy bg-clip-text text-transparent">
                            Impact
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl border-2 border-gray-200">
                            <Users className="w-16 h-16 text-brand-teal mb-6" />
                            <h3 className="text-2xl font-bold mb-4 text-brand-navy">Pour les Usagers</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
                                    <span>Fin de la fragmentation</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
                                    <span>Gagner du temps grâce aux itinéraires optimisés</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
                                    <span className="font-bold text-brand-teal">Inclusion 100%</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl border-2 border-gray-200">
                            <Bus className="w-16 h-16 text-brand-teal mb-6" />
                            <h3 className="text-2xl font-bold mb-4 text-brand-navy">Pour les Réseaux</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
                                    <span>Optimisation de l'offre basée sur la demande réelle</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
                                    <span>Augmentation des revenus</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
                                    <span className="font-bold text-brand-teal">Contrôle & Pouvoir</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl border-2 border-gray-200">
                            <Globe className="w-16 h-16 text-brand-teal mb-6" />
                            <h3 className="text-2xl font-bold mb-4 text-brand-navy">Pour l'État</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
                                    <span>Infrastructure numérique souveraine</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
                                    <span>Tarifs sociaux sans coûts administratifs</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" />
                                    <span>Planification urbaine basée sur les données</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision */}
            <section className="py-20 bg-gradient-to-br from-brand-teal to-brand-navy text-white">
                <div className="container px-4 mx-auto text-center max-w-5xl">
                    <h2 className="text-5xl md:text-6xl font-bold mb-8">Vision Sénégal 2050</h2>
                    <p className="text-2xl text-white/90 mb-12">
                        Positionner le Sénégal comme un hub incontournable de l'innovation technologique
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                            <TrendingUp className="w-16 h-16 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-3">Modèle exportable</h3>
                            <p className="text-white/80">Créer un modèle d'innovation exportable vers d'autres pays d'Afrique de l'Ouest</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                            <Zap className="w-16 h-16 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-3">JO de la Jeunesse</h3>
                            <p className="text-white/80">Solution de mobilité unifiée et fiable pour démontrer l'expertise sénégalaise</p>
                        </div>
                    </div>
                    <div className="mt-12">
                        <Link href="/contact">
                            <Button size="lg" className="bg-white text-brand-teal hover:bg-gray-100 px-12 py-8 text-xl font-bold">
                                Rejoindre la vision
                                <ArrowRight className="ml-3 w-6 h-6" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
