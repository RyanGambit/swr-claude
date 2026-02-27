import { useState, useEffect, useRef } from "react";

const SCOUT_IMG_SM = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAcFBQYFBAcGBgYIBwcICxILCwoKCxYPEA0SGhYbGhkWGRgcICgiHB4mHhgZIzAkJiorLS4tGyIyNTEsNSgsLSz/2wBDAQcICAsJCxULCxUsHRkdLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCz/wAARCAAwADADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD6BoorkPHnjiLwlZKqbGvJRlQ/3VX+8fX6VBM5qC5mbmseIdP0KPfezbPl37QMkjIAwPUkgCotC8SWuvozW6hMchWlUsR67QcivB5daHjjVo2vdcl+1RjdENgCjHOMf0rZ0zxVpfg25NjHqM6zs3mSOkY8vJ+tckq9pWRyLEtyv0Pd6DWF4Z8Sw6/a5DIZAu4FeA49QO1btdMZKaujsjJSV0BIAySAK+cPH07+K/G94lvIjRIdkYc/fx04/Cve/E9tLd+FtQigkkjm8kvG0Z+YMvzDH4ivl5fEX9n3DyEQxSE/M6HJY/zpVHJRfKjjxTbaidTqGlRaL5d3c2cVjYRPGIJkjbzcFSHEp5DZPOe3sK19L0m31XWIZYobTVNJnDJcsUbzQuPlMZ7EHPXg57gYrloviHqFxaS21vAbpmQqEC7gOO56U7SviFeaJaR29zZiGRFA+Zcbh7H1rzG6t+a2pnzLmvY7vw1E3g++sI/NQRiTbIMn5Qxwcg9Pw4r2HIIyCCPWvnC48d22qBSY4Ltv4fMJDIff1r33w5BLB4bsUndnmaIPIzdSzfMf5104Vy1Ukb4d7xReuZ4ra0lnnIEUaFnPsBzXyD4uvNNvfEN5PZ2y28TSFkUcjGele/8Axn8Qf2P4L+zRyuk162wbeMqOufbpXzJbEzysWOV3Y9SfWu/oZ15c0rdjU0rWzZFTFgD1WtO68SxXdsY7iNH9yP5VlW2jW84VgGVmOOuMnGcVu2eiWULrItuJ1zklzhsEdfwNcFRU+a5yuw7wgsE/iC2uJrBXtIn3yLjAYDsa+qbaeO5tYp4TmKRAyn2r5avdRTTZ7d4cxqz7WwMEZ5H1+te4fCrW11Pw1JaFsyWb4/4AeR/WtKUm5eTOjC1LS5e5/9k=";

/* ═══════════════════════════════════════════════════════════════════
   SCOUT — FULL PROTOTYPE
   Page 1: Address Lookup
   Page 2: Intake Form → "Talk to Scout"
   Page 3: Chat (Anthropic API) → "See Results"
   Page 4: Dashboard (deterministic engine output)
   ═══════════════════════════════════════════════════════════════════ */

// ── LIGHT THEME (Pages 1, 2, 4) ──
const C = {
  bg:"#FFFFFF",bgSoft:"#F8FAFB",card:"#FFFFFF",
  cardBorder:"#E2E8F0",cardInner:"#F1F5F9",
  accent:"#0F7A5F",accentLight:"#E6F5F0",accentBorder:"#B4DDD0",
  dark:"#0F172A",text:"#334155",textMuted:"#64748B",textDim:"#94A3B8",
  border:"#E2E8F0",borderLight:"#F1F5F9",
  warning:"#D97706",warningLight:"#FEF3C7",warningBorder:"#FCD34D",
  red:"#DC2626",redLight:"#FEF2F2",redBorder:"#FECACA",
  blue:"#2563EB",blueLight:"#EFF6FF",blueBorder:"#BFDBFE",
  shadow:"0 1px 3px rgba(0,0,0,0.06),0 1px 2px rgba(0,0,0,0.04)",
  shadowMd:"0 4px 12px rgba(0,0,0,0.06),0 2px 4px rgba(0,0,0,0.04)",
};
// ── CHAT THEME (Page 3 — now light, matching other pages) ──
const D = {
  bg:"#FFFFFF",bgAlt:"#F8FAFB",card:"#F1F5F9",cardHover:"#E2E8F0",
  accent:"#0F7A5F",accentDim:"#E6F5F0",accentBorder:"#B4DDD0",accentSolid:"#059669",
  white:"#0F172A",text:"#334155",textMuted:"#64748B",textDim:"#94A3B8",
  border:"#E2E8F0",borderLight:"#F1F5F9",
  warning:"#D97706",red:"#DC2626",blue:"#2563EB",
};

// ═══════════════════════════════════════════════════════════════════
// ENGINE DATA — LOOKUP TABLES
// ═══════════════════════════════════════════════════════════════════

const EUI_BENCHMARKS={
  office:{"6A":{"pre-1980":{median:1.85},"1980-2000":{median:1.56},"post-2000":{median:1.20}}},
  retail:{"6A":{"pre-1980":{median:1.65},"1980-2000":{median:1.41},"post-2000":{median:1.10}}},
  "condo-lowrise":{"6A":{"pre-1980":{median:1.40},"1980-2000":{median:1.15},"post-2000":{median:0.90}}},
  "condo-midrise":{"6A":{"pre-1980":{median:1.50},"1980-2000":{median:1.25},"post-2000":{median:0.95}}},
  "condo-highrise":{"6A":{"pre-1980":{median:1.60},"1980-2000":{median:1.35},"post-2000":{median:1.05}}},
  apartment:{"6A":{"pre-1980":{median:1.45},"1980-2000":{median:1.20},"post-2000":{median:0.92}}},
  "mixed-use":{"6A":{"pre-1980":{median:1.70},"1980-2000":{median:1.45},"post-2000":{median:1.10}}},
  industrial:{"6A":{"pre-1980":{median:1.30},"1980-2000":{median:1.10},"post-2000":{median:0.85}}},
  institutional:{"6A":{"pre-1980":{median:2.00},"1980-2000":{median:1.65},"post-2000":{median:1.30}}},
};
const EUI_FALLBACK={"6A":{"pre-1980":{median:1.60},"1980-2000":{median:1.30},"post-2000":{median:1.00}}};

const ENERGY_SPLIT={
  office:{gas:0.50,electric:0.50},retail:{gas:0.45,electric:0.55},
  "condo-lowrise":{gas:0.60,electric:0.40},"condo-midrise":{gas:0.55,electric:0.45},
  "condo-highrise":{gas:0.50,electric:0.50},apartment:{gas:0.58,electric:0.42},
  "mixed-use":{gas:0.48,electric:0.52},industrial:{gas:0.55,electric:0.45},
  institutional:{gas:0.55,electric:0.45},_default:{gas:0.52,electric:0.48},
};

const EQUIPMENT_LIFECYCLE={
  boiler_steel:{medianLife:25,name:"Steel Fire-tube Boiler"},
  chiller_air:{medianLife:20,name:"Air-cooled Chiller"},
  rtu:{medianLife:15,name:"Rooftop Unit"},
  bas:{medianLife:18,name:"Building Automation System"},
  roof_builtup:{medianLife:22,name:"Built-up Roof"},
  roof_membrane:{medianLife:25,name:"Membrane Roof"},
  windows_aluminum:{medianLife:28,name:"Aluminum Frame Windows"},
  elevator:{medianLife:25,name:"Elevator"},
  electrical_service:{medianLife:35,name:"Electrical Service"},
  domestic_hw_boiler:{medianLife:25,name:"DHW Boiler"},
};

const TYPICAL_SYSTEMS={
  office:["boiler_steel","chiller_air","rtu","bas","roof_builtup","windows_aluminum","elevator","electrical_service"],
  retail:["rtu","roof_builtup","windows_aluminum","electrical_service"],
  "condo-lowrise":["boiler_steel","roof_membrane","windows_aluminum","domestic_hw_boiler","electrical_service"],
  "condo-midrise":["boiler_steel","chiller_air","roof_membrane","windows_aluminum","elevator","domestic_hw_boiler","electrical_service"],
  "condo-highrise":["boiler_steel","chiller_air","roof_membrane","windows_aluminum","elevator","domestic_hw_boiler","electrical_service","bas"],
  apartment:["boiler_steel","roof_membrane","windows_aluminum","domestic_hw_boiler","elevator","electrical_service"],
  "mixed-use":["boiler_steel","chiller_air","rtu","roof_builtup","windows_aluminum","elevator","electrical_service"],
  industrial:["rtu","roof_builtup","electrical_service"],
  institutional:["boiler_steel","chiller_air","bas","roof_builtup","windows_aluminum","elevator","electrical_service"],
  _default:["boiler_steel","rtu","roof_builtup","windows_aluminum","electrical_service"],
};

const ENVELOPE_BY_ERA={
  "pre-1980":{roof:{rValue:12,label:"R-12"},wall:{rValue:8,label:"R-8"},windows:{uValue:5.0,label:"Single-pane, aluminum"},airTight:{ach50:10}},
  "1980-2000":{roof:{rValue:18,label:"R-18"},wall:{rValue:13,label:"R-13"},windows:{uValue:3.0,label:"Double-pane, aluminum"},airTight:{ach50:5}},
  "post-2000":{roof:{rValue:25,label:"R-25"},wall:{rValue:17,label:"R-17"},windows:{uValue:2.2,label:"Double-pane, improved"},airTight:{ach50:3}},
};
const NECB_2020={roof:{rValue:31},wall:{rValue:22},windows:{uValue:1.6}};

const MEASURE_COSTS={
  boiler_condensing_gas:{name:"High-efficiency condensing gas boiler",costMid:4.5,savingsGas:0.15,savingsElec:0,ghg:0.15},
  boiler_heat_pump_ready:{name:"Heat-pump-ready condensing boiler",costMid:7.5,savingsGas:0.15,savingsElec:0,ghg:0.15},
  roof_insulation:{name:"Roof insulation upgrade (to R-40+)",costMid:11,savingsGas:0.08,savingsElec:0.03,ghg:0.08},
  windows_partial:{name:"Window replacement — priority facades",costMid:55,savingsGas:0.07,savingsElec:0.02,ghg:0.06,isWindow:true},
  windows_full:{name:"Full window replacement",costMid:55,savingsGas:0.12,savingsElec:0.04,ghg:0.10,isWindow:true},
  air_sealing:{name:"Air sealing & envelope commissioning",costMid:2,savingsGas:0.05,savingsElec:0.02,ghg:0.04},
  bas_upgrade:{name:"BAS upgrade with demand-controlled ventilation",costMid:2,savingsGas:0.05,savingsElec:0.08,ghg:0.05},
  wall_insulation:{name:"Exterior wall insulation upgrade",costMid:25,savingsGas:0.10,savingsElec:0.03,ghg:0.08,isWall:true},
  electrification_heat_pump:{name:"Full electrification — heat pump conversion",costMid:15,savingsGas:0.80,savingsElec:-0.30,ghg:0.55},
  electrical_service_upgrade:{name:"Electrical service upgrade",costMid:4,savingsGas:0,savingsElec:0,ghg:0},
  led_lighting:{name:"LED lighting retrofit",costMid:1.5,savingsGas:0,savingsElec:0.15,ghg:0.03},
};

const ENERGY_RATES={ontario:{elecPerKwh:0.16,gasPerM3:0.30}};
const CARBON={gasKgPerM3:1.89,gridGPerKwh:30,carEquiv:4.6,pricePerTonne:110};

const PATHWAY_TEMPLATES={
  essential:{name:"Essential Equipment Upgrades",tag:"RECOMMENDED FIRST",tagColor:C.accent,
    ghgTarget:{min:0.15,max:0.35},desc:"Replace end-of-life equipment and capture quick-win incentives. Addresses immediate maintenance liability while setting up a clean Phase 2.",
    measures:["boiler_condensing_gas","roof_insulation","bas_upgrade","led_lighting"],routing:"point-solution"},
  targeted:{name:"Targeted Decarbonization",tag:"BEST VALUE",tagColor:C.warning,
    ghgTarget:{min:0.35,max:0.60},desc:"Equipment replacement plus envelope upgrades. Hits the 25% GHG threshold that unlocks mid-tier DRAI funding and positions for electrification readiness.",
    measures:["boiler_heat_pump_ready","roof_insulation","windows_partial","air_sealing","bas_upgrade","led_lighting"],routing:"point-solution"},
  deep:{name:"Phased Deep Retrofit",tag:"HIGHEST IMPACT",tagColor:C.blue,
    ghgTarget:{min:0.60,max:0.90},desc:"Full envelope + electrification over 2-3 phases. Captures maximum incentive stack, positions for carbon tax avoidance, and unlocks asset value uplift.",
    measures:["boiler_heat_pump_ready","roof_insulation","windows_full","wall_insulation","air_sealing","bas_upgrade","electrification_heat_pump","electrical_service_upgrade","led_lighting"],routing:"turnkey"},
};

// ═══ DO NOT SURFACE (Section 5): DRAI is organizational funding, NOT building-owner capex ═══
// NRCan DRAI, Greener Homes, HER/HER+, Ontario Home Reno, GICB, HELP, Greener Homes Loan → excluded

const INCENTIVE_PROGRAMS=[
// ═══════════ SECTION 1: IESO SAVE ON ENERGY ═══════════
{key:"ieso_custom",name:"IESO Save on Energy — Custom Retrofit",org:"IESO / Enova Power (LDC)",type:"grant",section:"ieso",
  url:"https://saveonenergy.ca/For-Business-and-Industry/Programs-and-incentives/Retrofit-Program",
  contact:"retrofit@ieso.ca | 1-844-303-5542",localContact:"Enova Power 519-745-4771",
  tr:{},est:{pct:0.08,min:5000,max:500000},preApproval:true,timing:"4–8 weeks",
  action:"Apply via LDC",stackOrder:2,stackNote:"Stacks with Enbridge (diff fuel), CT ITC, CIB. Submit BEFORE any purchase order.",
  desc:"Up to 50% of eligible costs. $1,800/kW demand reduced OR $0.20/kWh saved."},
{key:"ieso_prescriptive",name:"IESO Save on Energy — Prescriptive",org:"IESO / Enova Power (LDC)",type:"grant",section:"ieso",
  url:"https://saveonenergy.ca/For-Business-and-Industry/Programs-and-incentives/Retrofit-Program",
  contact:"retrofit@ieso.ca | 1-844-303-5542",
  tr:{},est:{pct:0.03,min:2000,max:100000},preApproval:true,timing:"4–6 weeks",
  action:"Download Prescriptive Worksheets",stackOrder:2,stackNote:"Combine with Custom as Combination Project for one application.",
  desc:"Fixed per-unit: LED ~$40–60/fixture, Solar PV $860/kW-AC, VFDs $100–400/unit."},
{key:"ieso_small_biz",name:"IESO Small Business Program",org:"IESO / Enova Power (LDC)",type:"grant",section:"ieso",
  url:"https://saveonenergy.ca/For-Your-Small-Business/Programs-and-Incentives",
  contact:"smallbusiness@ieso.ca | 1-844-303-5542",
  tr:{maxElecKwh:250000},est:{flat:5500},preApproval:false,timing:"Rolling — same-day install",
  action:"Call for Free Assessment",stackOrder:1,stackNote:"Co-delivered with Enbridge. Joint DCKV up to $26,500 for restaurant kitchens.",
  desc:"Up to $3,000 lighting + $2,500 non-lighting. Direct install at zero cost."},
{key:"ieso_ebcx",name:"IESO Existing Building Commissioning (EBCx)",org:"IESO / Enova Power (LDC)",type:"grant",section:"ieso",
  url:"https://saveonenergy.ca/For-Business-and-Industry/Programs-and-incentives/Existing-Building-Commissioning-Program",
  contact:"EBCx@ieso.ca | Enova Power 519-745-4771",
  tr:{minElecKwh:750000},est:{pct:0.04,min:30000,max:150000},preApproval:true,timing:"18–24 months total",
  action:"Email EBCx@ieso.ca",stackOrder:1,stackNote:"Ideal pre-assessment: EBCx finds operational savings → Retrofit covers capital measures.",
  desc:"Up to $150,000/facility. Phased across Investigation, Implementation, Persistence."},
{key:"ieso_epp",name:"IESO Energy Performance Program (EPP)",org:"IESO / Enova Power (LDC)",type:"grant",section:"ieso",
  url:"https://saveonenergy.ca/For-Business-and-Industry/Programs-and-incentives",
  contact:"retrofit@ieso.ca | 1-844-303-5542",
  tr:{minElecKwh:1500000},est:{method:"annual",annualPct:0.02,min:5000,max:100000},preApproval:true,timing:"3-year commitment",
  action:"Confirm Intake with IESO",stackOrder:3,stackNote:"$0.30/kWh summer peak + $0.08/kWh non-summer. Pairs with EBCx. Enova smart meters enable direct verification.",
  desc:"Pay-for-performance. Annual payments for verified whole-building electricity savings ≥5%. Rates doubled Jan 2025.",isAnnual:true},
{key:"ieso_instant",name:"IESO Instant Discounts — Lighting",org:"IESO / participating distributors",type:"rebate",section:"ieso",
  url:"https://saveonenergy.ca/en/For-Business-and-Industry/Programs-and-incentives/Instant-Discounts-Program",
  contact:"IESO: 1-844-303-5542",
  tr:{},est:{flat:4000,min:500,max:30000},preApproval:false,timing:"Instant at point of sale",
  action:"Find Participating Distributor",stackOrder:1,stackNote:"ZERO paperwork. Discount on invoice at participating distributor. Don't overlap with Retrofit Program on same fixtures.",
  desc:"Per-unit discounts at point of sale: LED high bay up to $140/fixture, troffers $30–75, occupancy sensors $15–30."},
{key:"ieso_xlerate",name:"IESO XLerate Program",org:"IESO",type:"grant",section:"ieso",
  url:"https://saveonenergy.ca/en/For-Business-and-Industry/Programs-and-incentives/XLerate",
  contact:"xlerate@ieso.ca | 1-844-303-5542",
  tr:{minElecKwh:3000000,institutional:true},est:{pct:0.12,min:50000,max:15000000},preApproval:true,timing:"Rolling — up to 5 years",
  action:"Contact xlerate@ieso.ca",stackOrder:2,stackNote:"$300/MWh verified savings ($450 in grid-constrained areas). Up to $15M/project. 50% feasibility study co-funding available.",
  desc:"Up to $15M/project, 75% of eligible costs. Replaces IEEP. Requires ≥600 MWh/yr savings. Industrial/institutional only."},

// ═══════════ SECTION 2: ENBRIDGE GAS ═══════════
{key:"enbridge_custom",name:"Enbridge Gas — Custom Retrofit",org:"Enbridge Gas",type:"rebate",section:"enbridge",
  url:"https://enbridgegas.com/ontario/business-industrial/incentives-conservation/programs-and-incentives/retrofits-custom-projects/commercial-custom-retrofit-program",
  contact:"1-877-362-7434 | esa@enbridge.com",
  tr:{gasCustomer:true},est:{pct:0.05,min:5000,max:100000},preApproval:true,timing:"Contact Advisor BEFORE purchasing",
  action:"Call Energy Solutions",stackOrder:2,stackNote:"$0.25/m³ gas saved. Max 50% of INCREMENTAL cost vs standard. Stacks with IESO (diff fuel), CT ITC, CIB.",
  desc:"Up to $100K commercial / $500K institutional. Based on incremental cost vs standard equipment."},
{key:"enbridge_prescriptive",name:"Enbridge Gas — Prescriptive DCV",org:"Enbridge Gas",type:"rebate",section:"enbridge",
  url:"https://enbridgegas.com/ontario/business-industrial/incentives-conservation/programs-and-incentives/equipment-upgrades/fixed-incentive-program",
  contact:"1-877-362-7434",
  tr:{gasCustomer:true,food:true},est:{flat:8500,min:5000,max:12000},preApproval:true,timing:"4–6 weeks",
  action:"Confirm DCV Eligibility",stackOrder:2,stackNote:"DCV joint with IESO Small Biz = up to $26,500 combined for restaurant kitchen exhaust. Landlord receives incentive even for tenant kitchens (split incentive resolution).",
  desc:"$5,000–$12,000 for restaurant kitchen DCV. Fixed per-unit amounts. Simpler than Custom."},
{key:"enbridge_ddp",name:"Enbridge Gas — Distributor Discount (DDP)",org:"Enbridge Gas",type:"rebate",section:"enbridge",
  url:"https://enbridgegas.com/ontario/business-industrial/incentives-conservation/programs-and-incentives/equipment-upgrades/distributor-discount-program",
  contact:"1-877-362-7434",
  tr:{gasCustomer:true},est:{flat:1500,min:200,max:5000},preApproval:false,timing:"Instant at point of sale",
  action:"Find Participating Distributor",stackOrder:1,stackNote:"ZERO paperwork. Instant discount at counter. Stacks with Custom and CT ITC on same equipment.",
  desc:"Instant discount on condensing unit heaters, tankless water heaters, commercial kitchen equipment. ENERGY STAR certified."},
{key:"enbridge_p4p",name:"Enbridge Gas — Pay for Performance (P4P)",org:"Enbridge Gas",type:"grant",section:"enbridge",
  url:"https://enbridgegas.com/ontario/business-industrial/incentives-conservation/programs-and-incentives/pay-for-performance",
  contact:"1-877-362-7434",
  tr:{gasCustomer:true,minGasM3:50000},est:{method:"annual",annualPct:0.015,min:3000,max:50000},preApproval:true,timing:"Confirm current intake",
  action:"Confirm P4P Availability",stackOrder:3,stackNote:"Gas operational savings — 3yr program with free Delivery Agent. Pairs with IESO EPP (gas + electricity operational stack).",
  desc:"Annual incentive for verified gas savings. Must commit to 20% savings over 3 years. Free coaching included.",isAnnual:true},

// ═══════════ SECTION 3: FEDERAL CASH ═══════════
{key:"ct_itc",name:"Clean Technology ITC — 30%",org:"CRA / NRCan",type:"tax-credit",section:"federal",
  url:"https://canada.ca/en/revenue-agency/services/tax/businesses/topics/corporations/business-tax-credits/clean-economy-itc/clean-technology-itc",
  contact:"CRA Business: 1-800-959-5525",
  tr:{corp:true,hasHeatPumpOrSolar:true},est:{method:"taxCredit",pct:0.30,min:10000,max:500000},preApproval:false,timing:"Claimed on T2 return",
  action:"Confirm with Accountant",stackOrder:3,stackNote:"REFUNDABLE — CRA pays cash even with no tax owing. Govt grants reduce eligible cost first. Labour requirements do NOT apply to heat pumps (full 30%).",
  desc:"30% refundable tax credit on heat pumps, GSHP, solar PV, battery storage. Corporations/REITs only. New equipment March 2023–Dec 2034."},
{key:"ce_itc",name:"Clean Electricity ITC — 15%",org:"CRA / NRCan",type:"tax-credit",section:"federal",
  url:"https://canada.ca/en/department-finance/news/2026/02/government-launches-consultations-on-potential-domestic-content-requirement-for-clean-technology-and-clean-electricity-investment-tax-credits.html",
  contact:"CRA Business: 1-800-959-5525",
  tr:{pending:true,nonTaxable:true,hasSolarOrBattery:true},est:{method:"taxCredit",pct:0.15,min:5000,max:300000},preApproval:false,timing:"Awaiting Royal Assent",
  action:"Monitor Legislation",stackOrder:4,stackNote:"For non-taxable entities (Crown corps, municipal corps, Indigenous orgs). Solar PV + battery only — NOT heat pumps. Does NOT stack with CT ITC.",
  desc:"15% refundable credit. AWAITING ROYAL ASSENT — not yet enacted as of Feb 2026. Retroactive to Apr 16, 2024 upon enactment."},
{key:"cca_43",name:"Accelerated CCA — Class 43.1",org:"CRA",type:"tax-deduction",section:"federal",
  url:"https://nrcan.gc.ca/energy-efficiency/buildings/tax-savings-industry",
  contact:"CRA Business: 1-800-959-5525",
  tr:{corp:true,hasHeatPumpOrSolar:true},est:{flat:12000,min:5000,max:40000},preApproval:false,timing:"Claimed on T2 by accountant",
  action:"Accountant Classifies Asset",stackOrder:4,stackNote:"30% declining balance vs 20% standard. Zero additional effort — just asset classification. Always recommend alongside CT ITC.",
  desc:"Year-1 tax saving ~$10K–$15K on typical commercial ASHP. Applied to reduced UCC after CT ITC."},
{key:"cib",name:"CIB Building Retrofits Initiative",org:"Canada Infrastructure Bank / Scotiabank / BMO",type:"financing",section:"federal",
  url:"https://cib-bic.ca/en/building-retrofits-initiative",
  contact:"CIB: 1-833-551-5245 | Scotiabank Commercial | BMO Commercial",
  tr:{minGhg:0.30},est:{financing:true},preApproval:true,timing:"3–6 months to closing",
  action:"Contact Scotiabank or CIB",stackOrder:3,stackNote:"Sub-commercial rates (~2–3%). No minimum project size since June 2025 Scotiabank partnership. Apply grants first → CIB finances remaining net cost.",
  desc:"Long-term low-interest loans. ≥30% GHG reduction required. Scotiabank removed ~$5M minimum. Est. $340K–$460K interest savings over 20yr on $500K."},
{key:"efficiency_capital",name:"Efficiency Capital — Turnkey ESCO",org:"Efficiency Capital",type:"financing",section:"federal",
  url:"https://efficiencycapital.com",
  contact:"info@efficiencycap.com | 416-306-8181",
  tr:{minCapex:500000,minGhg:0.30},est:{financing:true,turnkey:true},preApproval:false,timing:"3–6 months to ESA",
  action:"Request Free Feasibility",stackOrder:5,stackNote:"Zero upfront cost. They handle financing, engineering, procurement, construction, incentive applications, 20-yr performance management. One phone call, not three workstreams.",
  desc:"Energy Services Agreement: they finance and manage everything. Owner repays from savings over 10–20 years. Cash-flow positive from year one."},

// ═══════════ SECTION 4: ADDITIONAL & SPECIALIST ═══════════
{key:"cmhc_mli",name:"CMHC MLI Select",org:"CMHC",type:"financing",section:"specialist",
  url:"https://cmhc-schl.gc.ca/en/professionals/project-funding-and-mortgage-financing/mortgage-loan-insurance/mli-select",
  contact:"Any CMHC-approved lender (TD, RBC, BMO, Scotia, CIBC)",
  tr:{residential:true},est:{financing:true},preApproval:true,timing:"8–16 weeks",
  action:"Contact CMHC-Approved Lender",stackOrder:2,stackNote:"Up to 95% LTV + 50-year amortization at 50 climate points. Most powerful financing lever for multi-residential. Reduces annual P+I by ~$32K/yr on $1.5M mortgage.",
  desc:"Points-based mortgage insurance. Climate points from energy retrofit. 50+ points = 95% LTV, 50-yr amortization. Residential/mixed-use only."},
{key:"iso_50001",name:"NRCan ISO 50001 Grant",org:"NRCan",type:"grant",section:"specialist",
  url:"https://nrcan.gc.ca/energy-efficiency/buildings/iso-50001",
  contact:"NRCan: 1-800-387-2000",
  tr:{minElecKwh:750000},est:{flat:40000,min:20000,max:40000},preApproval:true,timing:"Apply before implementation",
  action:"Apply to NRCan",stackOrder:4,stackNote:"Up to $40K/building, $200K/portfolio. Pairs with EBCx + EPP: ISO 50001 prevents 15–40% savings decay within 3 years.",
  desc:"60% cost-share (75% non-profit). Covers energy review, EMIS software, training, certification audit. Prevents EBCx savings erosion."},
{key:"bdc_green",name:"BDC Certified Green Building Loan",org:"Business Development Bank of Canada",type:"financing",section:"specialist",
  url:"https://bdc.ca/en/financing/certified-green-building-loan",
  contact:"BDC: 1-877-232-2269",
  tr:{},est:{financing:true},preApproval:false,timing:"Apply at any time",
  action:"Contact BDC",stackOrder:4,stackNote:"Up to 100% project costs, 25-yr repayment. Interest rate discount upon BOMA BEST Silver+ / ENERGY STAR / LEED Silver. Free green certification specialist session included.",
  desc:"Interest rate reduction for certified green buildings. Interest-only up to 36 months. Available to any Canadian business (not just corporations)."},
{key:"toronto_erl",name:"City of Toronto — Energy Retrofit Loans",org:"City of Toronto BBP",type:"financing",section:"specialist",
  url:"https://toronto.ca/services-payments/water-environment/environmental-grants-incentives/energy-retrofit-loans",
  contact:"bbp@toronto.ca",
  tr:{toronto:true},est:{financing:true},preApproval:true,timing:"4–8 months",
  action:"Contact bbp@toronto.ca",stackOrder:2,stackNote:"Up to 100% of project costs, 30-yr term at City borrowing rate (~3.5–4.5%). 1-yr payment-free period. For Toronto buildings — often beats CIB.",
  desc:"Unsecured long-term financing at City's cost of borrowing. All building types in Toronto. Requires ASHRAE Level 2 audit."},
{key:"zevip",name:"Federal ZEVIP — EV Charging",org:"NRCan",type:"grant",section:"specialist",
  url:"https://tc.canada.ca/en/road-transportation/innovative-technologies/zero-emission-vehicles/zero-emission-vehicle-infrastructure-program-zevip",
  contact:"NRCan ZEVIP: 1-800-387-2000",
  tr:{parking:true},est:{pct:0.50,min:5000,max:100000},preApproval:true,timing:"4–8 weeks conditional approval",
  action:"Apply at tc.canada.ca/zevip",stackOrder:2,stackNote:"50% of eligible costs up to $100K/site. Stack with ChargeON + CT ITC. Electrical panel upgrade is biggest cost variable — ZEVIP covers it.",
  desc:"Up to 50% of EV charger hardware + electrical infrastructure. Apply BEFORE purchasing. Workplace, fleet, MURB parking."},
{key:"chargeon",name:"Ontario ChargeON — EV Charging",org:"Ontario Ministry of Transportation",type:"grant",section:"specialist",
  url:"https://chargeonontario.ca",
  contact:"Ontario: 1-800-267-0059",
  tr:{parking:true},est:{flat:8000,min:2000,max:25000},preApproval:true,timing:"Check intake status",
  action:"Check chargeonontario.ca",stackOrder:3,stackNote:"Stack with ZEVIP (designed to work together). L2: up to $1,000–$1,500/port. L3: up to $5,000/port. Intake may be between rounds — design for ZEVIP-only base case.",
  desc:"Per-port provincial EV grant. Apply simultaneously with ZEVIP. Confirm program is in open intake before advising."},
{key:"waterloo_wet",name:"Region of Waterloo — W.E.T. Program",org:"Region of Waterloo",type:"grant",section:"specialist",
  url:"https://regionofwaterloo.ca/en/living-here/commercial-programs-and-funding.aspx",
  contact:"watercycle@regionofwaterloo.ca | 519-575-4400",
  tr:{waterloo:true,hasWaterUse:true},est:{flat:4000,min:1000,max:15000},preApproval:true,timing:"18–24 months to payment",
  action:"Request Free Water Review",stackOrder:4,stackNote:"$0.40/L/day saved. Free water-use review + free fixtures. 50% cost-share for sub-metering up to $10K. Pairs with CMHC MLI for MURBs.",
  desc:"Savings-based: $0.40/L/day. Cooling towers, fixture replacement, commercial kitchen. 2–5 yr payback on water alone."},
{key:"toronto_buyback",name:"City of Toronto — Capacity Buyback",org:"Toronto Water",type:"grant",section:"specialist",
  url:"https://toronto.ca/services-payments/water-environment/how-to-use-less-water/water-efficiency-for-business/capacity-buyback-program",
  contact:"savewater@toronto.ca",
  tr:{toronto:true,hasWaterUse:true},est:{flat:5000,min:1000,max:20000},preApproval:true,timing:"Apply before implementing",
  action:"Contact savewater@toronto.ca",stackOrder:4,stackNote:"$0.30/L/day saved. FREE professional engineer water audit included. Stack with Toronto ERL for financing.",
  desc:"One-time cash rebate + free PE water audit. ICI buildings in Toronto. Industrial ≤5,000 m³/yr for rebate."},
{key:"gifmp",name:"NRCan GIFMP — Industrial Facilities",org:"NRCan",type:"grant",section:"specialist",
  url:"https://natural-resources.canada.ca/energy-efficiency/industry-energy-efficiency/green-industrial-facilities-manufacturing-program",
  contact:"nrcan.rfpindustry-ddpindustrie.rncan@canada.ca",
  tr:{closed:true,industrial:true},est:{pct:0.50,min:40000,max:10000000},preApproval:true,timing:"CLOSED — monitor for 4th intake",
  action:"Monitor NRCan for Reopening",stackOrder:2,stackNote:"Up to 50% / $10M per proposal. Industrial manufacturing ONLY (physical/chemical transformation). 3rd intake closed Sep 2025.",
  desc:"CLOSED. Large industrial capital grant. Up to 50% of costs, max $10M. Watch for 4th intake announcement."},
{key:"fcm_gmf",name:"FCM Green Municipal Fund",org:"FCM",type:"grant",section:"specialist",
  url:"https://greenmunicipalfund.ca/funding",
  contact:"FCM: 1-613-241-5221",
  tr:{muni:true},est:{pct:0.15,min:10000,max:1500000},preApproval:true,timing:"Two-stage process",
  action:"Apply at greenmunicipalfund.ca",stackOrder:2,stackNote:"Grant (15% of loan) + low-interest loan up to $10M. Up to 80% combined. ≥30% GHG + ≥25% EUI reduction required.",
  desc:"Study grant up to $200K + capital grant/loan combination. Municipal buildings only: arenas, rec centres, libraries, fire stations."},
];

const PARTNER_CONTACTS=[
  {name:"Andrew Bennett",title:"Commercial Programs Advisor",org:"Enova Power",type:"LDC Representative",email:"abennett@enovapower.ca",phone:"519-745-4771",pathways:["all"],routing:"point-solution",color:C.accent,initials:"AB",
    desc:"Your local distribution company contact for all IESO Save on Energy programs — Custom, Prescriptive, EBCx, and EPP."},
  {name:"Enbridge Energy Solutions",title:"Energy Solutions Advisor",org:"Enbridge Gas",type:"Gas Utility",email:"esa@enbridge.com",phone:"1-877-362-7434",pathways:["all"],routing:"point-solution",color:C.blue,initials:"EG",
    desc:"Free service — advisor confirms Custom Retrofit, DCV Prescriptive, DDP, and P4P eligibility. Contact BEFORE purchasing any equipment."},
  {name:"Michael Tran",title:"Senior Retrofit Advisor",org:"Efficiency Capital",type:"Turnkey ESCO Partner",email:"info@efficiencycap.com",phone:"416-306-8181",pathways:["deep"],routing:"turnkey",color:C.warning,initials:"EC",
    turnkeyDesc:"Handles financing, engineering, procurement, construction, incentive applications, and 20-year performance management. One phone call, not three workstreams."},
  {name:"CIB Commercial Team",title:"Building Retrofits Initiative",org:"Canada Infrastructure Bank / Scotiabank",type:"Federal Financing",email:"info@cib-bic.ca",phone:"1-833-551-5245",pathways:["targeted","deep"],routing:"point-solution",color:"#818CF8",initials:"CB",
    desc:"Sub-commercial rate financing for projects achieving ≥30% GHG reduction. Scotiabank partnership removed minimum project size."},
  {name:"BDC Green Lending",title:"Certified Green Building Loans",org:"Business Development Bank of Canada",type:"Federal Financing",email:"info@bdc.ca",phone:"1-877-232-2269",pathways:["targeted","deep"],routing:"point-solution",color:"#F472B6",initials:"BD",
    desc:"Up to 100% project costs, 25-yr repayment. Interest rate discount for BOMA BEST Silver+ or ENERGY STAR certified buildings."},
];

// ═══════════════════════════════════════════════════════════════════
// 9 FINANCIAL LEVERS (Section 6) — what completes the business case
// ═══════════════════════════════════════════════════════════════════
const MARKET_RENTS={office:18,retail:22,industrial:12,institutional:15,"mixed-use":20,apartment:16,"condo-lowrise":0,"condo-midrise":0,"condo-highrise":0};

function calculateLevers(building,pathway,carbon){
  const sqft=building.sqft||0;const capRate=0.07;
  const rent=MARKET_RENTS[building.type]||16;
  const isMultiTenant=["office","retail","mixed-use","apartment","institutional"].includes(building.type);
  const hasResidential=["apartment","condo-lowrise","condo-midrise","condo-highrise","mixed-use"].includes(building.type);
  const elecKwh=building.electricKwh||0;const elecRate=0.15;
  const carbonRed=pathway.carbonReduction||0;

  const L1_rentPremium=rent>0?Math.round(sqft*rent*0.04):0;
  const L1_assetValue=L1_rentPremium>0?Math.round(L1_rentPremium/capRate):0;
  const L2_vacancyGain=rent>0?Math.round(sqft*rent*0.05):0;
  const L2_assetValue=L2_vacancyGain>0?Math.round(L2_vacancyGain/capRate):0;
  const L3_avoidedPremium=Math.round(pathway.capitalCost*0.25);
  const L4_standardReplacement=Math.round(pathway.capitalCost*0.15);
  const L4_incrementalCost=pathway.capitalCost-L4_standardReplacement;
  const L4_incrementalNet=Math.max(0,L4_incrementalCost-(pathway.incentiveEligible||0));
  const solarKwAc=Math.min(Math.round(sqft*0.004),500);
  const L5_solarAnnual=Math.round(solarKwAc*1000*elecRate);
  const L5_solarIESO=Math.round(solarKwAc*860);
  const L5_solarCTITC=building.isCorporate?Math.round((solarKwAc*2000-L5_solarIESO)*0.30):0;
  const L5_solarNetCost=Math.max(0,Math.round(solarKwAc*2000-L5_solarIESO-L5_solarCTITC));
  const L5_solarPayback=L5_solarAnnual>0?(L5_solarNetCost/L5_solarAnnual).toFixed(1):null;
  const L7_certCost=3500;
  const L8_carbon50=Math.round(carbonRed*50);
  const L8_carbon170=Math.round(carbonRed*170);
  const L9_subBehavioral=isMultiTenant?Math.round(elecKwh*0.12*elecRate):0;
  const L9_subCost=isMultiTenant?25000:0;
  const L9_subPayback=L9_subBehavioral>0?(L9_subCost/L9_subBehavioral).toFixed(1):null;

  // 20-year total value
  const conservativeTotal=(pathway.incentiveEligible||0)+350000+(pathway.annualSavings||0)*20+L5_solarAnnual*20+L1_assetValue+L3_avoidedPremium+L9_subBehavioral*20;
  const baseTotal=conservativeTotal+L2_assetValue+L8_carbon50*20+(hasResidential?640000:0);
  const netProjectCost=pathway.netCost||pathway.capitalCost;

  return{
    levers:[
      {key:"L1",name:"Green Premium — Rent & Asset Value",type:"Revenue Enhancement",bankable:true,
        annualValue:L1_rentPremium,assetValue:L1_assetValue,
        detail:`4% rent premium (CBRE 2022 verified): ${fmt$(L1_rentPremium)}/yr additional revenue. At ${(capRate*100).toFixed(0)}% cap rate = ${fmt$(L1_assetValue)} asset value uplift.`,
        applicable:rent>0},
      {key:"L2",name:"Reduced Vacancy — Green Buildings Retain Tenants",type:"Vacancy Risk Reduction",bankable:true,
        annualValue:L2_vacancyGain,assetValue:L2_assetValue,
        detail:`Certified buildings: 4.9 percentage points lower vacancy (CBRE Q3 2025). Reducing vacancy 5% = ${fmt$(L2_vacancyGain)}/yr. Capitalized = ${fmt$(L2_assetValue)}.`,
        applicable:rent>0},
      {key:"L3",name:"Regulatory Compliance — Avoided Emergency Retrofit",type:"Risk Mitigation",bankable:true,
        annualValue:0,assetValue:L3_avoidedPremium,
        detail:`Emergency retrofits cost 20–35% more. Avoided premium: ${fmt$(L3_avoidedPremium)}. Toronto BEPS in development; Vancouver mandatory from 2026.`,
        applicable:true},
      {key:"L4",name:"Lifecycle Alignment — Incremental Cost Framing",type:"Capital Efficiency",bankable:true,
        annualValue:0,assetValue:0,incrementalNet:L4_incrementalNet,
        detail:`Standard replacement already required. Incremental efficiency premium: ${fmt$(L4_incrementalCost)}. After incentives: ${fmt$(L4_incrementalNet)}. Present as "mandatory capex + efficiency upside."`,
        applicable:true},
      {key:"L5",name:"Net Metering — Rooftop Solar",type:"Bill Reduction",bankable:true,
        annualValue:L5_solarAnnual,assetValue:0,netCost:L5_solarNetCost,payback:L5_solarPayback,
        detail:`~${solarKwAc} kW-AC system. Annual savings: ${fmt$(L5_solarAnnual)}. IESO: ${fmt$(L5_solarIESO)}. ${building.isCorporate?`CT ITC: ${fmt$(L5_solarCTITC)}.`:""} Net cost: ${fmt$(L5_solarNetCost)}. Payback: ${L5_solarPayback} years.`,
        applicable:sqft>5000},
      {key:"L6",name:"Green Lease — Split Incentive Resolution",type:"Structural",bankable:false,
        annualValue:0,assetValue:0,
        detail:"Green lease clauses align landlord-tenant incentives. CAGBC Green Lease Leaders provides free templates. Required for enforceable cost recovery on retrofit investment.",
        applicable:isMultiTenant},
      {key:"L7",name:"BOMA BEST / ENERGY STAR Certification",type:"Certification Pathway",bankable:true,
        annualValue:0,assetValue:0,cost:L7_certCost,
        detail:`Certification cost: ~${fmt$(L7_certCost)}. Unlocks: BDC rate reduction, green rent premium, GRESB benchmarking, tenant ESG compliance.`,
        applicable:true},
      {key:"L8",name:"Carbon Credit Revenue",type:"Emerging Revenue",bankable:false,
        annualValue:L8_carbon50,assetValue:0,
        detail:`Future upside (not base case). At $50/tCO₂e: ${fmt$(L8_carbon50)}/yr. At $170/tCO₂e (2030): ${fmt$(L8_carbon170)}/yr. Building protocols under development.`,
        applicable:carbonRed>10},
      {key:"L9",name:"Smart Submetering — Behavioral Savings",type:"Data Infrastructure",bankable:true,
        annualValue:L9_subBehavioral,assetValue:0,cost:L9_subCost,payback:L9_subPayback,
        detail:`10–15% behavioral savings from consumption visibility: ${fmt$(L9_subBehavioral)}/yr. Hardware: ~${fmt$(L9_subCost)}. Payback: ${L9_subPayback} years. Enables green lease enforcement + EPP verification.`,
        applicable:isMultiTenant},
    ].filter(l=>l.applicable),
    summary:{conservativeTotal,baseTotal,netProjectCost,
      conservativeRatio:netProjectCost>0?(conservativeTotal/netProjectCost).toFixed(1):0,
      baseRatio:netProjectCost>0?(baseTotal/netProjectCost).toFixed(1):0,
      hasResidential},
  };
}

// ═══════════════════════════════════════════════════════════════════
// ENGINE
// ═══════════════════════════════════════════════════════════════════

function getAgeBracket(y){if(!y)return"1980-2000";if(y<1980)return"pre-1980";if(y<=2000)return"1980-2000";return"post-2000";}
function sqftToM2(s){return s*0.0929;}
function gjToKwh(g){return g*277.78;}
function fmt$(n){if(n==null||isNaN(n))return"—";return"$"+Math.round(n).toLocaleString();}
function r2(n){return Math.round(n*100)/100;}

function buildEngine(inputs){
  const {buildingType,yearBuilt,sqft,units,floors:inputFloors,userEnergyCost,ownershipType,role,capitalPlan,disruption,motivations,approach,contextFieldsFilled}=inputs;
  const effectiveSqft=sqft||(units?units*900:20000);
  const m2=sqftToM2(effectiveSqft);
  const ageBracket=getAgeBracket(yearBuilt);
  const benchmarks=EUI_BENCHMARKS[buildingType]?.["6A"]?.[ageBracket]||EUI_FALLBACK["6A"][ageBracket];
  const totalEnergyGJ=benchmarks.median*m2;
  const totalEnergyKwh=gjToKwh(totalEnergyGJ);
  const euiKwhPerSqft=r2(totalEnergyKwh/effectiveSqft);
  const split=ENERGY_SPLIT[buildingType]||ENERGY_SPLIT._default;
  const gasGJ=totalEnergyGJ*split.gas;
  const gasM3=gasGJ/0.0373;
  const electricKwh=totalEnergyKwh*split.electric;
  const rates=ENERGY_RATES.ontario;
  const estGasCost=gasM3*rates.gasPerM3;
  const estElecCost=electricKwh*rates.elecPerKwh;
  const estTotal=estGasCost+estElecCost;
  const annualEnergyCost=userEnergyCost||estTotal;
  const costSource=userEnergyCost?"user-provided":"estimated";
  const annualGasCost=userEnergyCost?annualEnergyCost*split.gas:estGasCost;
  const annualElecCost=userEnergyCost?annualEnergyCost*split.electric:estElecCost;
  const envelope=ENVELOPE_BY_ERA[ageBracket]||ENVELOPE_BY_ERA["1980-2000"];
  const envelopeGaps=[];
  if(envelope.roof.rValue<NECB_2020.roof.rValue)envelopeGaps.push({component:"Roof",current:`R-${envelope.roof.rValue}`,code:`R-${NECB_2020.roof.rValue}`});
  if(envelope.wall.rValue<NECB_2020.wall.rValue)envelopeGaps.push({component:"Wall",current:`R-${envelope.wall.rValue}`,code:`R-${NECB_2020.wall.rValue}`});
  const systems=TYPICAL_SYSTEMS[buildingType]||TYPICAL_SYSTEMS._default;
  const buildingAge=yearBuilt?2026-yearBuilt:null;
  const triggers=systems.map(sysKey=>{
    const eq=EQUIPMENT_LIFECYCLE[sysKey];if(!eq)return null;
    const age=buildingAge||40;const remaining=eq.medianLife-age;
    let status="info";if(remaining<=0)status="critical";else if(remaining<=5)status="warning";
    return{key:sysKey,name:eq.name,medianLife:eq.medianLife,estimatedAge:age,remaining:Math.max(0,remaining),status};
  }).filter(Boolean);
  const floors=inputFloors||(buildingType?.includes("highrise")?15:buildingType?.includes("midrise")?8:buildingType?.includes("lowrise")?3:2);
  const roofSqft=Math.round(effectiveSqft/floors);
  const perimeterFt=Math.sqrt(effectiveSqft/floors)*4;
  const wallSqft=perimeterFt*10*floors;
  const windowSqft=Math.round(wallSqft*0.25);

  function buildPathway(key){
    const t=PATHWAY_TEMPLATES[key];
    const measures=[];let totalCap=0,totalGasS=0,totalElecS=0,totalGhg=0;
    t.measures.forEach(mk=>{
      const m=MEASURE_COSTS[mk];if(!m)return;
      let area=effectiveSqft;
      if(mk.includes("roof"))area=roofSqft;
      else if(m.isWindow)area=key==="deep"?windowSqft:Math.round(windowSqft*0.5);
      else if(m.isWall)area=wallSqft;
      const cost=Math.round(m.costMid*area);
      measures.push({key:mk,name:m.name,cost});
      totalCap+=cost;totalGasS+=m.savingsGas;totalElecS+=m.savingsElec;totalGhg+=m.ghg;
    });
    totalGasS=Math.min(totalGasS,0.85);totalElecS=Math.min(totalElecS,0.40);
    totalGhg=Math.min(totalGhg,t.ghgTarget.max);totalGhg=Math.max(totalGhg,t.ghgTarget.min);
    const annGasSav=Math.round(annualGasCost*totalGasS);
    const annElecSav=Math.round(annualElecCost*Math.max(0,totalElecS));
    const annSav=annGasSav+annElecSav;
    const currentEmissions=(gasM3*CARBON.gasKgPerM3+electricKwh*CARBON.gridGPerKwh/1000)/1000;
    const carbonRed=r2(currentEmissions*totalGhg);
    return{id:key,name:t.name,tag:t.tag,tagColor:t.tagColor,routing:t.routing,
      summary:t.desc,measures:measures.map(m=>m.name),measuresDetailed:measures,
      capitalCost:totalCap,annualSavings:annSav,ghgReduction:Math.round(totalGhg*100)+"%",
      ghgReductionPct:totalGhg,carbonReduction:Math.round(carbonRed),currentEmissions:r2(currentEmissions)};
  }

  let pathways=["essential","targeted","deep"].map(buildPathway);

  // Build matching context for trigger-based program selection
  const isCorporate=["portfolio","smallLandlord","singleOwner"].includes(ownershipType);
  const isMunicipal=ownershipType==="municipality";
  const hasResidential=["apartment","condo-lowrise","condo-midrise","condo-highrise","mixed-use"].includes(buildingType);
  const isIndustrial=buildingType==="industrial";
  const isInstitutional=buildingType==="institutional";
  const hasFoodService=["restaurant","cafe","grocery","food_manufacturing","cafeteria"].includes(inputs.businessType);
  const hasParking=!["condo-highrise"].includes(buildingType); // most commercial buildings have parking
  const hasWaterUse=["apartment","condo-lowrise","condo-midrise","condo-highrise","mixed-use","institutional","industrial"].includes(buildingType)||hasFoodService;
  const isToronto=(inputs.city||"").toLowerCase().includes("toronto")||(inputs.postal||"").toUpperCase().startsWith("M");
  const isWaterloo=(inputs.region||"").toLowerCase().includes("waterloo");

  pathways=pathways.map(p=>{
    const matched=[];
    const hasHP=p.measures.some(m=>m.toLowerCase().includes("heat pump")||m.toLowerCase().includes("electrification"));
    const hasSolar=p.measures.some(m=>m.toLowerCase().includes("solar"));
    const hasHPorSolar=hasHP||hasSolar||p.id==="deep"; // deep pathway always has HP path

    INCENTIVE_PROGRAMS.forEach(prog=>{
      const tr=prog.tr||{};
      // Trigger checks — if ANY condition fails, skip this program
      if(tr.closed)return;
      if(tr.maxElecKwh&&electricKwh>tr.maxElecKwh)return;
      if(tr.minElecKwh&&electricKwh<tr.minElecKwh)return;
      if(tr.minGasM3&&gasM3<tr.minGasM3)return;
      if(tr.gasCustomer&&!true)return; // V1: assume Enbridge gas territory
      if(tr.corp&&!isCorporate)return;
      if(tr.muni&&!isMunicipal)return;
      if(tr.toronto&&!isToronto)return;
      if(tr.waterloo&&!isWaterloo)return;
      if(tr.residential&&!hasResidential)return;
      if(tr.industrial&&!isIndustrial)return;
      if(tr.institutional&&!isInstitutional&&!isIndustrial)return;
      if(tr.food&&!hasFoodService)return;
      if(tr.parking&&!hasParking)return;
      if(tr.hasWaterUse&&!hasWaterUse)return;
      if(tr.hasHeatPumpOrSolar&&!hasHPorSolar)return;
      if(tr.hasSolarOrBattery&&!hasSolar&&p.id!=="deep")return;
      if(tr.nonTaxable&&isCorporate)return;
      if(tr.minGhg&&p.ghgReductionPct<tr.minGhg)return;
      if(tr.minCapex&&p.capitalCost<tr.minCapex)return;

      // Calculate estimated amount
      const est=prog.est||{};
      const isFinancing=prog.type==="financing"||(est.financing===true)||(est.turnkey===true);
      let amount=null;
      if(est.flat){amount=est.flat;}
      else if(est.method==="taxCredit"){
        const eligibleCap=p.capitalCost*(hasHP?0.5:0.3); // HP portion of capex
        amount=Math.round(eligibleCap*est.pct);
        if(est.min)amount=Math.max(est.min,amount);if(est.max)amount=Math.min(est.max,amount);
      } else if(est.method==="annual"){
        amount=Math.round(p.annualSavings*(est.annualPct||0.02));
        if(est.min)amount=Math.max(est.min,amount);if(est.max)amount=Math.min(est.max,amount);
      } else if(est.pct){
        amount=Math.round(p.capitalCost*est.pct);
        if(est.min)amount=Math.max(est.min,amount);if(est.max)amount=Math.min(est.max,amount);
      }

      // Status logic
      let status="eligible";
      if(tr.pending)status="pending";
      else if(prog.key==="fcm_gmf"&&!isMunicipal)status="check-eligibility";
      else if(prog.key==="ct_itc"&&!isCorporate)status="check-eligibility";
      else if(prog.key==="efficiency_capital"&&p.capitalCost<500000)status="pre-qualify";
      else if(prog.key==="cib"&&p.ghgReductionPct<0.35)status="pre-qualify";

      matched.push({...prog,amount,isFinancing,status,isAnnual:prog.isAnnual||false});
    });

    matched.sort((a,b)=>(a.stackOrder||5)-(b.stackOrder||5));
    const totalElig=matched.filter(m=>!m.isFinancing&&!m.isAnnual&&m.status!=="pending").reduce((s,m)=>s+(m.amount||0),0);
    const netCost=Math.max(0,p.capitalCost-totalElig);
    const payback=p.annualSavings>0?r2(netCost/p.annualSavings):null;
    return{...p,incentives:matched,incentiveEligible:totalElig,netCost,payback:payback?payback.toFixed(1)+" years":"—",paybackYears:payback};
  });
  pathways=pathways.map(p=>{
    const capRate=0.06;const assetValueUplift=p.annualSavings>0?Math.round(p.annualSavings/capRate):0;
    const costPerSqft=effectiveSqft>0?r2(p.netCost/effectiveSqft):null;
    const costPerUnit=units>0?Math.round(p.netCost/units):null;
    const monthlySavings=Math.round(p.annualSavings/12);const lifecycle20=p.annualSavings*20;
    let framing="";
    if(ownershipType==="portfolio")framing=`Net cost of ${fmt$(p.netCost)} across ${effectiveSqft.toLocaleString()} sqft = ${fmt$(costPerSqft)}/sqft. Projected NOI improvement of ${fmt$(p.annualSavings)}/yr. At a 6% cap rate, this represents ~${fmt$(assetValueUplift)} in asset value uplift.`;
    else if(ownershipType==="condo")framing=`Net cost of ${fmt$(p.netCost)} across ${units||"—"} units = ${fmt$(costPerUnit)}/unit. Annual common fee pressure reduction: ${fmt$(p.annualSavings)}/yr.`;
    else if(ownershipType==="smallLandlord")framing=`Out of pocket after grants: ${fmt$(p.netCost)}. Monthly savings: ${fmt$(monthlySavings)}/mo. Pays for itself in ${p.payback}, then it's pure savings.`;
    else if(ownershipType==="municipality")framing=`Capital requirement: ${fmt$(p.netCost)} after grants. Annual operating budget relief: ${fmt$(p.annualSavings)}/yr. Lifecycle savings over 20 years: ${fmt$(lifecycle20)}.`;
    else framing=`Net cost: ${fmt$(p.netCost)}. Annual savings: ${fmt$(p.annualSavings)}/yr. Simple payback: ${p.payback}.`;
    return{...p,financials:{assetValueUplift,costPerSqft,costPerUnit,monthlySavings,lifecycle20,framing,capRate}};
  });

  const gasEm=(gasM3*CARBON.gasKgPerM3)/1000;const elecEm=(electricKwh*CARBON.gridGPerKwh)/1000000;
  const totalEmissions=r2(gasEm+elecEm);

  // Generate whyForYou narrative per pathway
  const critTriggers=triggers.filter(t=>t.status==="critical");
  const critNames=critTriggers.map(t=>t.name).join(" and ");
  const ageYrs=buildingAge||40;
  pathways=pathways.map(p=>{
    let why="";
    if(p.id==="essential"){
      if(critTriggers.length>0)why=`Your ${critNames.toLowerCase()} ${critTriggers.length>1?"are":"is"} past expected lifecycle. Replacing now avoids emergency failure, captures ${fmt$(p.incentiveEligible)} in rebates, and sets up a clean Phase 2 if you choose to go deeper later.`;
      else why=`With a ${ageYrs}-year-old building approaching major system replacements, capturing ${fmt$(p.incentiveEligible)} in available rebates now makes financial sense — and sets up a clean Phase 2 if you choose to go deeper later.`;
    } else if(p.id==="targeted"){
      why=`Your building's ${yearBuilt?yearBuilt+"-era ":""}envelope is driving significant energy waste. This pathway bundles equipment replacement with envelope improvements that unlock deeper incentive tiers — turning a maintenance expense into a ${fmt$(p.incentiveEligible)} decarbonization investment.`;
    } else if(p.id==="deep"){
      const carbonExp=Math.round(totalEmissions*CARBON.pricePerTonne);
      why=`At current carbon pricing ($${CARBON.pricePerTonne}/tonne), this building's annual carbon tax exposure is ${fmt$(carbonExp)}/yr — and rising. A phased approach captures the maximum incentive stack of ${fmt$(p.incentiveEligible)}, positions for electrification, and qualifies you for a turnkey partner who manages the entire process.`;
    }
    return{...p,whyForYou:why};
  });

  let conf=8;
  if(buildingType)conf+=6;if(yearBuilt)conf+=5;if(sqft||units)conf+=4;
  if(userEnergyCost)conf+=6;if(ownershipType)conf+=3;if(role)conf+=4;
  if(capitalPlan?.length>0&&!capitalPlan.includes("unknown"))conf+=8;
  if(disruption)conf+=3;if(contextFieldsFilled>0)conf+=contextFieldsFilled*3;
  if(motivations?.length>0)conf+=2;if(approach)conf+=2;
  conf=Math.min(conf,95);
  // Calculate financial levers per pathway
  const carbonData={totalEmissions,gas:r2(gasEm),electric:r2(elecEm),annualExposure:Math.round(totalEmissions*CARBON.pricePerTonne),pricePerTonne:CARBON.pricePerTonne};
  const buildingForLevers={sqft:effectiveSqft,type:buildingType,isCorporate,electricKwh:Math.round(electricKwh)};
  pathways=pathways.map(p=>({...p,levers:calculateLevers(buildingForLevers,p,carbonData)}));

  return{
    building:{address:inputs.address||"",city:inputs.city||"",province:inputs.province||"ON",postal:inputs.postal||"",region:inputs.region||"Ontario",
      type:buildingType,businessType:inputs.businessType,yearBuilt,buildingAge,sqft:effectiveSqft,units,floors,climateZone:inputs.climateZone||"6A",ownershipType,role,ldc:inputs.ldc||"Local Distribution Company",gasUtility:inputs.gasUtility||"Natural Gas Provider",isCorporate},
    baseline:{sqft:effectiveSqft,euiKwhPerSqft,annualEnergyCost:Math.round(annualEnergyCost),costSource,
      gasM3:Math.round(gasM3),electricKwh:Math.round(electricKwh),annualGasCost:Math.round(annualGasCost),annualElecCost:Math.round(annualElecCost)},
    envelope:{current:envelope,gaps:envelopeGaps},
    triggers:triggers.filter(t=>t.status!=="info").concat(triggers.filter(t=>t.status==="info")).slice(0,5),
    pathways,
    carbon:carbonData,
    confidence:{score:conf,level:conf>=75?"high":conf>=50?"moderate":"low",dataVsAssumptions:`${conf}% based on your data. ${100-conf}% from benchmarks.`},
    partners:(()=>{const ldcName=inputs.ldc||"Local Distribution Company";const dp=PARTNER_CONTACTS.map(c=>c.type==="LDC Representative"?{...c,name:`${ldcName} — Commercial Programs`,org:ldcName,initials:ldcName.substring(0,2).toUpperCase()}:c);return{all:dp,turnkey:dp.find(c=>c.routing==="turnkey"),forPathway:(pid)=>dp.filter(c=>c.pathways[0]==="all"||c.pathways.includes(pid))};})(),
  };
}

// ═══════════════════════════════════════════════════════════════════
// FORM OPTIONS
// ═══════════════════════════════════════════════════════════════════

const BUILDING_TYPES=[
  {id:"condo-lowrise",label:"Condo — Low-rise"},{id:"condo-midrise",label:"Condo — Mid-rise"},
  {id:"condo-highrise",label:"Condo — High-rise"},{id:"apartment",label:"Rental Apartment"},
  {id:"office",label:"Office"},{id:"retail",label:"Retail / Strip Mall"},
  {id:"mixed-use",label:"Mixed Use"},{id:"industrial",label:"Industrial"},
  {id:"institutional",label:"Institutional"},
];
const YEAR_RANGES=[
  {id:"pre-1960",label:"Before 1960",mid:1955},{id:"1960-1975",label:"1960–1975",mid:1968},
  {id:"1976-1990",label:"1976–1990",mid:1983},{id:"1991-2005",label:"1991–2005",mid:1998},
  {id:"2006-2015",label:"2006–2015",mid:2010},{id:"post-2015",label:"After 2015",mid:2020},
];
const OWNERSHIP_TYPES=[
  {id:"condo",label:"Condo Corporation",icon:"🏢",desc:"Board, property manager, or unit owner"},
  {id:"portfolio",label:"Portfolio / Commercial",icon:"🏗",desc:"Asset manager, owner, or property manager"},
  {id:"smallLandlord",label:"Small Landlord",icon:"🏠",desc:"Own a building, maybe run your business in it"},
  {id:"municipality",label:"Municipality / Institution",icon:"🏛",desc:"City, school board, university, hospital"},
];
const APPROACHES=[
  {id:"minimal",label:"Fix what's urgent — minimize spend",color:C.text},
  {id:"moderate",label:"Invest if the case is strong",color:C.accent},
  {id:"ambitious",label:"Want the full opportunity",color:C.blue},
  {id:"unsure",label:"Figuring out if it's worth it",color:C.textMuted},
];
const CAPITAL_OPTIONS=[
  {id:"hvac",label:"HVAC / Boiler"},{id:"roof",label:"Roof"},{id:"windows",label:"Windows"},
  {id:"electrical",label:"Electrical"},{id:"multiple",label:"Multiple"},{id:"none",label:"Nothing planned"},{id:"unknown",label:"Not sure"},
];
const MOTIVATIONS=[
  {id:"equipment",label:"Equipment failing",icon:"⚠"},{id:"costs",label:"Energy costs",icon:"📈"},
  {id:"regulatory",label:"Regulatory",icon:"⚖"},{id:"mandate",label:"Mandate",icon:"✦"},
  {id:"funding",label:"Heard about funding",icon:"💰"},{id:"exploring",label:"Just exploring",icon:"🔍"},
];
const BUSINESS_TYPES=[
  {id:"professional",label:"Professional Services"},{id:"medical",label:"Medical / Clinic"},
  {id:"restaurant",label:"Restaurant / Food"},{id:"retail-biz",label:"Retail Store"},
  {id:"grocery",label:"Grocery / Refrigeration"},{id:"manufacturing",label:"Manufacturing"},
  {id:"warehouse",label:"Warehouse / Storage"},{id:"education",label:"Education"},
  {id:"government",label:"Government"},{id:"other-biz",label:"Other"},
];
const ROLE_OPTIONS=[
  {id:"owner",label:"Owner / Principal"},{id:"asset-mgr",label:"Asset Manager"},
  {id:"property-mgr",label:"Property Manager"},{id:"board-member",label:"Board Member"},
  {id:"energy-mgr",label:"Energy Manager"},{id:"facilities",label:"Facilities Manager"},
  {id:"other-role",label:"Other"},
];
const DISRUPTION_OPTIONS=[
  {id:"low",label:"Low — office, flexible tenants"},{id:"medium",label:"Medium — some sensitive operations"},
  {id:"high",label:"High — medical, restaurant, 24/7"},
];
const DEBT_OPTIONS=[
  {id:"yes",label:"Yes, if the terms are right"},{id:"no",label:"No — avoiding new debt"},
  {id:"unsure-debt",label:"Not sure yet"},
];

// ═══════════════════════════════════════════════════════════════════
// ADDRESS LOOKUP — DYNAMIC VIA WEB SEARCH
// ═══════════════════════════════════════════════════════════════════

// Region/LDC/utility data is now fully dynamic via web search — no hardcoded lookup tables needed.
// The searchProperty function returns ldc, gasUtility, climateZone, and region for any Canadian address.

// ═══════════════════════════════════════════════════════════════════
// SHARED UI COMPONENTS
// ═══════════════════════════════════════════════════════════════════

function Chip({label,icon,active,onClick}){
  return <button onClick={onClick} style={{padding:"7px 12px",borderRadius:8,border:`1px solid ${active?C.accentBorder:C.border}`,
    background:active?C.accentLight:C.bg,color:active?C.accent:C.text,fontSize:12,fontWeight:active?600:400,
    cursor:"pointer",transition:"all 0.12s",fontFamily:"inherit",display:"flex",alignItems:"center",gap:5}}>
    {icon&&<span style={{fontSize:11,opacity:active?1:0.5}}>{icon}</span>}{label}
  </button>;
}
function Card({children,style={},highlight}){
  return <div style={{background:C.card,border:`1px solid ${highlight||C.cardBorder}`,borderRadius:12,padding:18,boxShadow:C.shadow,...style}}>{children}</div>;
}
function StatBlock({label,value,sub,large,highlight}){
  return <div>
    <div style={{fontSize:10,fontWeight:600,letterSpacing:"0.07em",textTransform:"uppercase",color:C.textMuted,marginBottom:3}}>{label}</div>
    <div style={{fontSize:large?26:18,fontWeight:700,color:highlight?C.accent:C.dark,lineHeight:1.1,fontVariantNumeric:"tabular-nums"}}>{value}</div>
    {sub&&<div style={{fontSize:11,color:C.textMuted,marginTop:2}}>{sub}</div>}
  </div>;
}
function SectionHead({icon,label}){
  return <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
    <span style={{fontSize:13,opacity:0.5}}>{icon}</span>
    <span style={{fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:C.textMuted}}>{label}</span>
    <div style={{flex:1,height:1,background:C.border,marginLeft:8}}/>
  </div>;
}
function StatusBadge({status,type}){
  const isF=type==="financing";
  const isTax=type==="tax-credit"||type==="tax-deduction";
  const map={
    eligible:{bg:C.accentLight,color:C.accent,label:"Eligible"},
    "pre-qualify":{bg:C.warningLight,color:C.warning,label:"Pre-qualify"},
    "check-eligibility":{bg:C.blueLight,color:C.blue,label:"Check Eligibility"},
    pending:{bg:"rgba(251,191,36,0.12)",color:C.warning,label:"Pending Legislation"},
  };
  if(isF)return <span style={{fontSize:10,fontWeight:600,padding:"2px 8px",borderRadius:99,background:C.blueLight,color:C.blue}}>Financing</span>;
  if(isTax)return <span style={{fontSize:10,fontWeight:600,padding:"2px 8px",borderRadius:99,background:"rgba(168,85,247,0.12)",color:"#A855F7"}}>{type==="tax-credit"?"Tax Credit":"Tax Deduction"}</span>;
  const s=map[status]||map.eligible;
  return <span style={{fontSize:10,fontWeight:600,padding:"2px 8px",borderRadius:99,background:s.bg,color:s.color}}>{s.label}</span>;
}
function ProgressBar({percent}){
  return <div style={{display:"flex",alignItems:"center",gap:8}}>
    <div style={{flex:1,height:4,background:C.cardInner,borderRadius:2,overflow:"hidden"}}>
      <div style={{width:`${percent}%`,height:"100%",background:`linear-gradient(90deg, ${C.accent}, #34D399)`,borderRadius:2,transition:"width 0.6s"}}/>
    </div>
    <span style={{fontSize:11,color:C.textMuted,minWidth:30}}>{percent}%</span>
  </div>;
}


// ═══════════════════════════════════════════════════════════════════
// PAGE 1 — ADDRESS LOOKUP (LIVE WEB SEARCH)
// ═══════════════════════════════════════════════════════════════════

async function searchProperty(address){
  try{
    const res=await fetch("/api/claude",{
      method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        model:"claude-sonnet-4-20250514",max_tokens:1024,
        tools:[{type:"web_search_20250305",name:"web_search"}],
        messages:[{role:"user",content:`Search for this building/property and return what you can find about it. Address: "${address}"

Search for:
1. Municipal property assessment records (MPAC Ontario, BC Assessment, city assessment rolls)
2. The building's physical details - year built, square footage, building type, number of floors/units
3. Confirm the exact address exists and is a real property
4. Identify the local electricity distribution company (LDC) that serves this address (e.g. Toronto Hydro, Alectra, Hydro Ottawa, BC Hydro, etc.)
5. Identify the natural gas utility serving this address (e.g. Enbridge Gas, FortisBC, ATCO Gas, etc.)
6. Determine the climate zone for this location (NECB climate zones: Zone 4, 5A, 6A, 6B, 7A, 7B, 8)
7. Identify the region/municipality name

You MUST respond with ONLY a JSON object, no markdown, no backticks, no explanation. Use this exact format:
{
  "found": true or false,
  "address": "verified street address",
  "city": "city name",
  "province": "two-letter province code e.g. ON, BC, AB, QC",
  "postal": "postal code or null",
  "buildingType": "office" or "retail" or "condo" or "apartment" or "industrial" or "institutional" or "mixed-use" or null,
  "yearBuilt": year as number or null,
  "sqft": square footage as number or null,
  "floors": number of floors or null,
  "units": number of units if residential or null,
  "assessedValue": assessment value as number or null,
  "notes": "any useful details about the property in one sentence",
  "ldc": "name of local electricity distribution company serving this address",
  "gasUtility": "name of natural gas utility serving this address",
  "climateZone": "NECB climate zone e.g. 5A, 6A, 7A",
  "region": "region or municipality name e.g. Greater Toronto Area, Waterloo Region, Metro Vancouver"
}

If you cannot confirm the property exists, set found to false. Only include data you actually found - use null for anything you could not verify.`}],
      })
    });
    const data=await res.json();
    if(data.error){console.error("API error:",data.error);return null;}
    const text=data.content?.filter(b=>b.type==="text").map(b=>b.text).join("\n").trim();
    if(!text)return null;
    // Robust JSON extraction — find the JSON object even if surrounded by text
    const clean=text.replace(/```json|```/g,"").trim();
    const jsonMatch=clean.match(/\{[\s\S]*"found"[\s\S]*\}/);
    if(!jsonMatch)return null;
    return JSON.parse(jsonMatch[0]);
  }catch(e){
    console.error("Property search error:",e);
    return null;
  }
}


async function suggestAddresses(partial){
  if(!partial||partial.trim().length<4)return[];
  try{
    const res=await fetch("/api/claude",{
      method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        model:"claude-sonnet-4-20250514",max_tokens:400,
        tools:[{type:"web_search_20250305",name:"web_search"}],
        messages:[{role:"user",content:`The user is typing a building address in Canada. Their partial input is: "${partial}"

Search for real commercial/institutional building addresses that match this input. Search across all Canadian provinces and cities.

Respond with ONLY a JSON array of up to 5 address suggestions, no markdown, no backticks:
[{"address":"full street address","city":"city","province":"XX","type":"office/retail/condo/industrial/institutional/mixed-use or null"}]

Only suggest real addresses. If you can't find matches, return an empty array [].`}],
      })
    });
    const data=await res.json();
    const text=data.content?.filter(b=>b.type==="text").map(b=>b.text).join("\n").trim();
    if(!text)return[];
    const clean=text.replace(/```json|```/g,"").trim();
    const jsonMatch=clean.match(/\[[\s\S]*\]/);
    if(!jsonMatch)return[];
    return JSON.parse(jsonMatch[0]);
  }catch(e){return[];}
}

function AddressPage({onConfirm}){
  const [query,setQuery]=useState("");
  const [searching,setSearching]=useState(false);
  const [searchPhase,setSearchPhase]=useState(0);
  const [result,setResult]=useState(null);
  const [error,setError]=useState(null);
  const [confirmed,setConfirmed]=useState(null);
  const [suggestions,setSuggestions]=useState([]);
  const [sugLoading,setSugLoading]=useState(false);
  const [showSug,setShowSug]=useState(false);
  const debounceRef=useRef(null);
  const inputRef=useRef(null);

  const handleInputChange=(val)=>{
    setQuery(val);setError(null);
    if(debounceRef.current)clearTimeout(debounceRef.current);
    if(val.trim().length<4){setSuggestions([]);setShowSug(false);return;}
    debounceRef.current=setTimeout(async()=>{
      setSugLoading(true);setShowSug(true);
      const results=await suggestAddresses(val.trim());
      setSuggestions(results);setSugLoading(false);
    },400);
  };

  const handleSuggestionClick=(sug)=>{
    const full=`${sug.address}, ${sug.city}, ${sug.province||"ON"}`;
    setQuery(full);setSuggestions([]);setShowSug(false);
    setTimeout(()=>handleSearch(full),50);
  };

  const SEARCH_PHASES=["Searching property records...","Checking municipal assessment data...","Verifying building details...","Compiling results..."];

  const handleSearch=async(directQuery=null)=>{
    const q=directQuery||query.trim();
    if(!q||searching)return;
    setSearching(true);setError(null);setResult(null);setSearchPhase(0);
    const phaseTimer=setInterval(()=>setSearchPhase(p=>Math.min(p+1,SEARCH_PHASES.length-1)),2200);
    const data=await searchProperty(q);
    clearInterval(phaseTimer);
    setSearching(false);
    if(!data||!data.found){setError("Could not verify this property. Try a more specific address including street number, street name, and city.");return;}
    setResult({...data,
      region:data.region||data.city||"Unknown",
      ldc:data.ldc||"Local Distribution Company",
      gasUtility:data.gasUtility||"Natural Gas Provider",
      climateZone:data.climateZone||"6A",
    });
  };

  const handleConfirm=()=>{
    if(!result)return;
    const addressData={address:result.address,city:result.city,province:result.province||"ON",postal:result.postal||"",
      // Pass search-returned region data directly
      ldc:result.ldc,gasUtility:result.gasUtility,climateZone:result.climateZone,region:result.region,
      foundData:{yearBuilt:result.yearBuilt,sqft:result.sqft,floors:result.floors,units:result.units,buildingType:result.buildingType,assessedValue:result.assessedValue,notes:result.notes}};
    onConfirm(addressData);
  };

  const handleReset=()=>{setResult(null);setError(null);setQuery("");};

  return <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:result?"flex-start":"center",justifyContent:result?"flex-start":"center",
    padding:result?"48px 24px":"0 24px",maxWidth:600,width:"100%",margin:"0 auto",transition:"all 0.4s"}}>

    {!result&&!searching&&<div style={{textAlign:"center",marginBottom:32,animation:"fadeUp 0.4s ease"}}>
      <div style={{fontSize:11,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:C.accent,marginBottom:10}}>Introducing Scout</div>
      <h1 style={{fontSize:34,fontWeight:700,margin:"0 0 12px",letterSpacing:"-0.03em",lineHeight:1.15}}>Should your building go deeper?</h1>
      <p style={{fontSize:15,color:C.text,lineHeight:1.65,maxWidth:420,margin:"0 auto"}}>
        I'm Scout — your AI retrofit advisor. Give me an address. I'll see if a deep energy retrofit makes sense for you.
      </p>
    </div>}

    {searching&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:12,animation:"fadeUp 0.3s ease"}}>
      <img src={SCOUT_IMG_SM} alt="Scout" style={{width:44,height:44,borderRadius:12,animation:"pulse 1s ease infinite",objectFit:"cover"}}/>
      <div style={{fontSize:14,fontWeight:600}}>{SEARCH_PHASES[searchPhase]}</div>
      <div style={{fontSize:12,color:C.textMuted,maxWidth:340,textAlign:"center"}}>Searching public records for "{query}"</div>
      <div style={{width:200,height:3,background:C.cardInner,borderRadius:2,overflow:"hidden",marginTop:4}}>
        <div style={{width:`${Math.min(95,(searchPhase+1)*25)}%`,height:"100%",background:C.accent,borderRadius:2,transition:"width 1s ease"}}/>
      </div>
    </div>}

    {!result&&!searching&&<div style={{width:"100%",position:"relative"}}>
      <div style={{fontSize:10,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:C.accent,marginBottom:8}}>Building Address</div>
      <div style={{display:"flex",gap:8}}>
        <div style={{flex:1,position:"relative"}}>
          <input ref={inputRef} type="text" value={query} onChange={e=>handleInputChange(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter"){setShowSug(false);handleSearch();}if(e.key==="Escape")setShowSug(false);}}
            onFocus={()=>{if(suggestions.length>0)setShowSug(true);}}
            placeholder="e.g. 137 Glasgow Street, Kitchener, ON"
            autoComplete="off"
            style={{width:"100%",padding:"14px 18px",fontSize:16,background:C.bg,border:`2px solid ${error?C.red:query.length>0?C.accentBorder:C.border}`,
              borderRadius:showSug&&(sugLoading||suggestions.length>0)?"12px 12px 0 0":12,outline:"none",color:C.dark,fontFamily:"inherit",boxShadow:C.shadowMd,transition:"border-color 0.2s",boxSizing:"border-box"}}/>
          {showSug&&(sugLoading||suggestions.length>0)&&<div style={{position:"absolute",top:"100%",left:0,right:0,zIndex:60,background:C.bg,
            border:`2px solid ${C.accentBorder}`,borderTop:`1px solid ${C.border}`,borderRadius:"0 0 12px 12px",
            boxShadow:"0 8px 24px rgba(0,0,0,0.1)",overflow:"hidden"}}>
            {sugLoading&&suggestions.length===0&&<div style={{padding:"12px 18px",fontSize:13,color:C.textMuted,display:"flex",alignItems:"center",gap:8}}>
              <span style={{display:"inline-block",width:12,height:12,borderRadius:99,border:`2px solid ${C.accent}`,borderTopColor:"transparent",animation:"spin 0.6s linear infinite"}}/>
              Finding addresses...
            </div>}
            {suggestions.map((sug,i)=><div key={i}
              onClick={()=>handleSuggestionClick(sug)}
              onMouseDown={e=>e.preventDefault()}
              style={{padding:"10px 18px",cursor:"pointer",borderTop:i>0?`1px solid ${C.border}`:"none",transition:"background 0.1s"}}
              onMouseEnter={e=>e.currentTarget.style.background=C.bgSoft}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <div style={{fontSize:14,fontWeight:500,color:C.dark}}>{sug.address}</div>
              <div style={{fontSize:11,color:C.textMuted}}>{sug.city}, {sug.province||"ON"}{sug.type?` · ${sug.type}`:""}</div>
            </div>)}
          </div>}
        </div>
        <button onClick={()=>{setShowSug(false);handleSearch();}} disabled={!query.trim()}
          style={{padding:"14px 24px",borderRadius:12,border:"none",background:query.trim()?C.accent:C.cardInner,color:query.trim()?"#fff":C.textDim,
            fontSize:14,fontWeight:600,cursor:query.trim()?"pointer":"default",fontFamily:"inherit",boxShadow:query.trim()?C.shadowMd:"none",
            transition:"all 0.2s",whiteSpace:"nowrap"}}>
          Search
        </button>
      </div>
      {error&&<p style={{marginTop:10,fontSize:12,color:C.red,textAlign:"center"}}>{error}</p>}
      {!error&&<p style={{marginTop:10,fontSize:12,color:C.textDim,textAlign:"center"}}>Enter any commercial building address. Scout will search public records to verify the property.</p>}
    </div>}

    {result&&<div style={{width:"100%",animation:"fadeUp 0.35s ease"}}>
      {/* Verified address card */}
      <div style={{borderRadius:12,overflow:"hidden",background:C.bg,border:`1px solid ${C.accentBorder}`,boxShadow:C.shadow,marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 18px"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:34,height:34,borderRadius:10,background:C.accentLight,border:`1px solid ${C.accentBorder}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:16,fontWeight:600}}>{result.address}</span>
                <span style={{fontSize:8,fontWeight:700,letterSpacing:"0.06em",padding:"2px 7px",borderRadius:4,background:C.accentLight,color:C.accent}}>VERIFIED</span>
              </div>
              <div style={{fontSize:13,color:C.textMuted,marginTop:1}}>{result.city}, {result.province||"ON"} {result.postal||""}</div>
            </div>
          </div>
          <button onClick={handleReset} style={{padding:"6px 14px",borderRadius:6,border:`1px solid ${C.border}`,background:"transparent",color:C.textMuted,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>Change</button>
        </div>
        {result.ldc&&<div style={{padding:"9px 18px 10px",borderTop:`1px solid ${C.border}`,background:C.bgSoft,display:"flex",flexWrap:"wrap",gap:14}}>
          <span style={{fontSize:9,fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase",color:C.textDim}}>Detected</span>
          {[{l:"Region",v:result.region},{l:"Electric",v:result.ldc},{l:"Gas",v:result.gasUtility},{l:"Climate",v:result.climateZone}].filter(d=>d.v).map((d,i)=>
            <span key={i} style={{fontSize:11}}><span style={{color:C.textDim}}>{d.l}: </span><span style={{fontWeight:500}}>{d.v}</span></span>
          )}
        </div>}
      </div>

      {/* Found building data card */}
      {(result.yearBuilt||result.sqft||result.buildingType||result.assessedValue)&&<div style={{borderRadius:12,background:C.bg,border:`1px solid ${C.border}`,boxShadow:C.shadow,marginBottom:16,padding:"14px 18px"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
          <span style={{fontSize:9,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",color:C.accent}}>Property Data Found</span>
          <span style={{fontSize:10,color:C.textMuted}}>from public records</span>
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:16}}>
          {result.yearBuilt&&<div><div style={{fontSize:10,color:C.textDim,fontWeight:600,letterSpacing:"0.05em",textTransform:"uppercase"}}>Year Built</div><div style={{fontSize:18,fontWeight:700,color:C.dark}}>{result.yearBuilt}</div></div>}
          {result.sqft&&<div><div style={{fontSize:10,color:C.textDim,fontWeight:600,letterSpacing:"0.05em",textTransform:"uppercase"}}>Size</div><div style={{fontSize:18,fontWeight:700,color:C.dark}}>{result.sqft.toLocaleString()} sqft</div></div>}
          {result.floors&&<div><div style={{fontSize:10,color:C.textDim,fontWeight:600,letterSpacing:"0.05em",textTransform:"uppercase"}}>Floors</div><div style={{fontSize:18,fontWeight:700,color:C.dark}}>{result.floors}</div></div>}
          {result.units&&<div><div style={{fontSize:10,color:C.textDim,fontWeight:600,letterSpacing:"0.05em",textTransform:"uppercase"}}>Units</div><div style={{fontSize:18,fontWeight:700,color:C.dark}}>{result.units}</div></div>}
          {result.buildingType&&<div><div style={{fontSize:10,color:C.textDim,fontWeight:600,letterSpacing:"0.05em",textTransform:"uppercase"}}>Type</div><div style={{fontSize:18,fontWeight:700,color:C.dark,textTransform:"capitalize"}}>{result.buildingType}</div></div>}
          {result.assessedValue&&<div><div style={{fontSize:10,color:C.textDim,fontWeight:600,letterSpacing:"0.05em",textTransform:"uppercase"}}>Assessed Value</div><div style={{fontSize:18,fontWeight:700,color:C.dark}}>{"$"}{result.assessedValue.toLocaleString()}</div></div>}
        </div>
        {result.notes&&<div style={{fontSize:12,color:C.textMuted,marginTop:10,padding:"8px 12px",background:C.bgSoft,borderRadius:6,lineHeight:1.5}}>{result.notes}</div>}
        <div style={{fontSize:11,color:C.textDim,marginTop:8}}>This data will pre-fill your intake form. You can adjust anything that needs correcting.</div>
      </div>}

      <div style={{padding:"16px 20px",borderRadius:12,background:C.bg,border:`1px solid ${C.border}`,boxShadow:C.shadow,marginBottom:24}}>
        <div style={{fontSize:14,fontWeight:600,marginBottom:5}}>Property verified. Here is what comes next.</div>
        <div style={{fontSize:13,color:C.text,lineHeight:1.6}}>Scout will ask about your building and situation. Any data found above will be pre-filled. Then you will have a short conversation before seeing results.</div>
      </div>
      <div style={{display:"flex",justifyContent:"flex-end"}}>
        <button onClick={handleConfirm} style={{padding:"14px 32px",borderRadius:10,border:"none",background:C.accent,color:"#fff",
          fontSize:15,fontWeight:600,cursor:"pointer",fontFamily:"inherit",boxShadow:C.shadowMd}}>
          Continue →
        </button>
      </div>
    </div>}
  </div>;
}


// ═══════════════════════════════════════════════════════════════════
// PAGE 2 — INTAKE FORM
// ═══════════════════════════════════════════════════════════════════

function IntakeForm({onSubmit,addressData}){
  const fd=addressData.foundData||{};
  // Map found buildingType string to our ID
  const foundBt=fd.buildingType?BUILDING_TYPES.find(t=>t.id===fd.buildingType||t.label.toLowerCase().includes((fd.buildingType||"").toLowerCase()))?.id:null;
  // Map found yearBuilt to our year range
  const foundYr=fd.yearBuilt?YEAR_RANGES.find(y=>{const mid=y.mid;return Math.abs(mid-(fd.yearBuilt||0))<10;})?.id:null;

  const [bt,setBt]=useState(foundBt||null);
  const [yr,setYr]=useState(foundYr||null);
  const [sqft,setSqft]=useState(fd.sqft?String(fd.sqft):"");
  const [units,setUnits]=useState(fd.units?String(fd.units):"");
  const [energy,setEnergy]=useState("");
  const [own,setOwn]=useState(null);
  const [role,setRole]=useState(null);
  const [bizType,setBizType]=useState(null);
  const [cap,setCap]=useState([]);
  const [motiv,setMotiv]=useState([]);
  const [appr,setAppr]=useState(null);
  const [disr,setDisr]=useState(null);
  const [debt,setDebt]=useState(null);
  const hasPrefill=!!(fd.yearBuilt||fd.sqft||fd.buildingType);
  const isCondo=bt?.startsWith("condo");
  const yearBuilt=yr?YEAR_RANGES.find(y=>y.id===yr)?.mid:null;
  const buildingAge=yearBuilt?2026-yearBuilt:null;
  const canProceed=bt&&yr&&own&&appr;

  useEffect(()=>{if(isCondo&&!own)setOwn("condo");},[bt]);

  const handleSubmit=()=>{
    if(!canProceed)return;
    const ctxFilled=(disr?1:0)+(cap.length>0?1:0)+(debt?1:0)+(bizType?1:0)+(role?1:0);
    const engineInputs={
      address:addressData.address,city:addressData.city,province:addressData.province,
      postal:addressData.postal,ldc:addressData.ldc,gasUtility:addressData.gasUtility,climateZone:addressData.climateZone,region:addressData.region,
      buildingType:bt,yearBuilt:parseInt(fd.yearBuilt)||yearBuilt||1985,sqft:sqft?parseInt(sqft):(fd.sqft?parseInt(fd.sqft):null),units:units?parseInt(units):(fd.units?parseInt(fd.units):null),
      userEnergyCost:energy?parseInt(energy):null,ownershipType:own,
      role:role||"owner",businessType:bizType,
      capitalPlan:cap,disruption:disr,debt,motivations:motiv,approach:appr,contextFieldsFilled:ctxFilled,
    };
    const chatFormData={
      address:addressData.address,city:addressData.city,province:"ON",postal:addressData.postal,
      buildingType:BUILDING_TYPES.find(t=>t.id===bt)?.label||bt,
      businessType:bizType?BUSINESS_TYPES.find(b=>b.id===bizType)?.label:"Not specified",
      yearBuilt:fd.yearBuilt?String(fd.yearBuilt):yr?YEAR_RANGES.find(y=>y.id===yr)?.label:"Unknown",
      buildingAge:(fd.yearBuilt?2026-fd.yearBuilt:buildingAge)||"Unknown",
      size:isCondo?(units?`${units} units`:"Unknown"):(sqft?`${parseInt(sqft).toLocaleString()} sqft`:"Unknown"),
      climateZone:addressData.climateZone||"6A",region:addressData.region||"Ontario",
      ldc:addressData.ldc||"Local Distribution Company",
      gasUtility:addressData.gasUtility||"Natural Gas Provider",
      ownershipType:OWNERSHIP_TYPES.find(o=>o.id===own)?.label||own,
      role:role?ROLE_OPTIONS.find(r=>r.id===role)?.label:"Not specified",
      motivations:motiv.map(m=>MOTIVATIONS.find(x=>x.id===m)?.label||m),
      approach:APPROACHES.find(a=>a.id===appr)?.label||appr,
      capitalPlan:cap.map(c=>CAPITAL_OPTIONS.find(x=>x.id===c)?.label||c),
      energyCost:energy?`$${parseInt(energy).toLocaleString()}/yr`:null,
      disruptionSensitivity:disr?DISRUPTION_OPTIONS.find(d=>d.id===disr)?.label:"Not specified",
      debtComfort:debt?DEBT_OPTIONS.find(d=>d.id===debt)?.label:"Not specified",
    };
    onSubmit({engineInputs,chatFormData});
  };

  const ageSignal=buildingAge?(buildingAge>=45?{label:"Past midlife",color:C.red,bg:C.redLight}:buildingAge>=35?{label:"Approaching midlife",color:C.warning,bg:C.warningLight}:{label:`~${buildingAge} yrs`,color:C.textMuted,bg:C.cardInner}):null;

  return <div style={{maxWidth:620,margin:"0 auto",padding:"28px 24px 60px"}}>
    {/* Address bar */}
    <div style={{borderRadius:12,background:C.bg,border:`1px solid ${C.accentBorder}`,marginBottom:24,boxShadow:C.shadow,overflow:"hidden"}}>
      <div style={{padding:"11px 16px",display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:8,height:8,borderRadius:99,background:C.accent}}/>
        <span style={{fontSize:14,fontWeight:600}}>{addressData.address}</span>
        <span style={{fontSize:12,color:C.textMuted}}>{addressData.city}, {addressData.province} {addressData.postal}</span>
        <span style={{fontSize:8,fontWeight:700,letterSpacing:"0.06em",padding:"2px 7px",borderRadius:4,background:C.accentLight,color:C.accent}}>VERIFIED</span>
      </div>
    </div>

    <h1 style={{fontSize:22,fontWeight:700,margin:"0 0 6px",color:C.dark}}>Help Scout understand your situation</h1>
    <p style={{fontSize:13,color:C.text,margin:"0 0 28px",lineHeight:1.6}}>The more context you give, the sharper your assessment gets. Then you will chat briefly with Scout before seeing results.</p>

    {hasPrefill&&<div style={{padding:"10px 14px",borderRadius:8,background:C.accentLight,border:`1px solid ${C.accentBorder}`,marginBottom:20,fontSize:12,color:C.accent,lineHeight:1.5}}>
      <strong>Pre-filled from property records:</strong> {[fd.buildingType&&"building type",fd.yearBuilt&&`year built (${fd.yearBuilt})`,fd.sqft&&`size (${fd.sqft.toLocaleString()} sqft)`,fd.units&&`units (${fd.units})`].filter(Boolean).join(", ")}. Review and adjust if needed.
    </div>}

    {/* Building type */}
    <div style={{marginBottom:24}}>
      <div style={{fontSize:10,fontWeight:600,letterSpacing:"0.07em",textTransform:"uppercase",color:C.textMuted,marginBottom:8}}>Building type</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
        {BUILDING_TYPES.map(t=><Chip key={t.id} label={t.label} active={bt===t.id} onClick={()=>setBt(t.id)}/>)}
      </div>
    </div>

    {/* Business type */}
    {bt&&<div style={{marginBottom:24}}>
      <div style={{fontSize:10,fontWeight:600,letterSpacing:"0.07em",textTransform:"uppercase",color:C.textMuted,marginBottom:8}}>What operates in the building?</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
        {BUSINESS_TYPES.map(b=><Chip key={b.id} label={b.label} active={bizType===b.id} onClick={()=>setBizType(b.id)}/>)}
      </div>
      <div style={{fontSize:11,color:C.textDim,marginTop:6}}>Different businesses unlock different incentive programs and change retrofit economics.</div>
    </div>}

    {/* Year */}
    <div style={{marginBottom:24}}>
      <div style={{fontSize:10,fontWeight:600,letterSpacing:"0.07em",textTransform:"uppercase",color:C.textMuted,marginBottom:8}}>Approximate age</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
        {YEAR_RANGES.map(y=><Chip key={y.id} label={y.label} active={yr===y.id} onClick={()=>setYr(y.id)}/>)}
      </div>
      {ageSignal&&<div style={{marginTop:8,padding:"5px 10px",borderRadius:6,background:ageSignal.bg,display:"inline-flex",alignItems:"center",gap:5}}>
        <span style={{fontSize:11,fontWeight:600,color:ageSignal.color}}>⏱ {ageSignal.label}</span>
      </div>}
    </div>

    {/* Size + energy */}
    <div style={{display:"flex",gap:16,marginBottom:24}}>
      <div>
        <div style={{fontSize:10,fontWeight:600,letterSpacing:"0.07em",textTransform:"uppercase",color:C.textMuted,marginBottom:6}}>{isCondo?"Units":"Size (sqft)"}</div>
        <input type="text" value={isCondo?units:sqft} onChange={e=>{const v=e.target.value.replace(/\D/g,"");isCondo?setUnits(v):setSqft(v);}} placeholder={isCondo?"e.g. 48":"e.g. 42000"}
          style={{width:130,padding:"9px 12px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,fontSize:14,fontFamily:"'DM Mono',monospace",outline:"none",color:C.dark}}/>
      </div>
      <div>
        <div style={{fontSize:10,fontWeight:600,letterSpacing:"0.07em",textTransform:"uppercase",color:C.textMuted,marginBottom:6}}>Energy cost/yr (optional)</div>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <span style={{color:C.textMuted}}>$</span>
          <input type="text" value={energy} onChange={e=>setEnergy(e.target.value.replace(/\D/g,""))} placeholder="e.g. 85000"
            style={{width:130,padding:"9px 12px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,fontSize:14,fontFamily:"'DM Mono',monospace",outline:"none",color:C.dark}}/>
        </div>
      </div>
    </div>

    {/* Ownership */}
    <div style={{marginBottom:24,paddingTop:20,borderTop:`1px solid ${C.border}`}}>
      <div style={{fontSize:10,fontWeight:600,letterSpacing:"0.07em",textTransform:"uppercase",color:C.textMuted,marginBottom:8}}>Ownership structure</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        {OWNERSHIP_TYPES.map(o=>{const a=own===o.id;return <button key={o.id} onClick={()=>setOwn(o.id)}
          style={{padding:"11px 14px",borderRadius:10,textAlign:"left",border:`1px solid ${a?C.accentBorder:C.border}`,
            background:a?C.accentLight:C.bg,cursor:"pointer",fontFamily:"inherit",transition:"all 0.12s"}}>
          <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:2}}>
            <span style={{fontSize:14}}>{o.icon}</span>
            <span style={{fontSize:13,fontWeight:600,color:a?C.accent:C.dark}}>{o.label}</span>
          </div>
          <div style={{fontSize:11,color:C.textMuted,paddingLeft:21}}>{o.desc}</div>
        </button>;})}
      </div>
    </div>

    {/* Your role */}
    {own&&<div style={{marginBottom:24}}>
      <div style={{fontSize:10,fontWeight:600,letterSpacing:"0.07em",textTransform:"uppercase",color:C.textMuted,marginBottom:8}}>Your role</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
        {ROLE_OPTIONS.map(r=><Chip key={r.id} label={r.label} active={role===r.id} onClick={()=>setRole(r.id)}/>)}
      </div>
    </div>}

    {/* Capital plan */}
    <div style={{marginBottom:24}}>
      <div style={{fontSize:10,fontWeight:600,letterSpacing:"0.07em",textTransform:"uppercase",color:C.textMuted,marginBottom:8}}>Capital work planned or needed?</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
        {CAPITAL_OPTIONS.map(c=><Chip key={c.id} label={c.label} active={cap.includes(c.id)} onClick={()=>setCap(p=>p.includes(c.id)?p.filter(x=>x!==c.id):[...p,c.id])}/>)}
      </div>
    </div>

    {/* Motivation */}
    <div style={{marginBottom:24}}>
      <div style={{fontSize:10,fontWeight:600,letterSpacing:"0.07em",textTransform:"uppercase",color:C.textMuted,marginBottom:8}}>What brings you here?</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
        {MOTIVATIONS.map(m=><Chip key={m.id} label={m.label} icon={m.icon} active={motiv.includes(m.id)} onClick={()=>setMotiv(p=>p.includes(m.id)?p.filter(x=>x!==m.id):[...p,m.id])}/>)}
      </div>
    </div>

    {/* Approach */}
    <div style={{marginBottom:32,paddingTop:20,borderTop:`1px solid ${C.border}`}}>
      <div style={{fontSize:10,fontWeight:600,letterSpacing:"0.07em",textTransform:"uppercase",color:C.textMuted,marginBottom:8}}>Your approach</div>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {APPROACHES.map(a=>{const active=appr===a.id;return <button key={a.id} onClick={()=>setAppr(a.id)}
          style={{padding:"12px 14px",borderRadius:10,textAlign:"left",border:`1px solid ${active?C.accentBorder:C.border}`,
            background:active?C.accentLight:C.bg,cursor:"pointer",fontFamily:"inherit",transition:"all 0.12s",
            display:"flex",alignItems:"center",gap:10}}>
          <span style={{width:8,height:8,borderRadius:99,background:active?a.color:C.border,flexShrink:0}}/>
          <span style={{fontSize:13,fontWeight:active?600:400,color:active?C.dark:C.text}}>{a.label}</span>
        </button>;})}
      </div>
    </div>

    {/* Disruption sensitivity */}
    <div style={{marginBottom:24}}>
      <div style={{fontSize:10,fontWeight:600,letterSpacing:"0.07em",textTransform:"uppercase",color:C.textMuted,marginBottom:8}}>Tenant disruption sensitivity</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
        {DISRUPTION_OPTIONS.map(d=><Chip key={d.id} label={d.label} active={disr===d.id} onClick={()=>setDisr(d.id)}/>)}
      </div>
    </div>

    {/* Debt comfort */}
    <div style={{marginBottom:32}}>
      <div style={{fontSize:10,fontWeight:600,letterSpacing:"0.07em",textTransform:"uppercase",color:C.textMuted,marginBottom:8}}>Comfortable taking on financing?</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
        {DEBT_OPTIONS.map(d=><Chip key={d.id} label={d.label} active={debt===d.id} onClick={()=>setDebt(d.id)}/>)}
      </div>
    </div>

    {/* CTA */}
    <div style={{display:"flex",justifyContent:"flex-end",paddingTop:16,borderTop:`1px solid ${C.border}`}}>
      <button onClick={handleSubmit} style={{padding:"13px 28px",borderRadius:10,border:"none",
        background:canProceed?C.accent:C.cardInner,color:canProceed?"#fff":C.textDim,
        fontSize:15,fontWeight:600,cursor:canProceed?"pointer":"default",fontFamily:"inherit",
        boxShadow:canProceed?C.shadowMd:"none",opacity:canProceed?1:0.5,transition:"all 0.3s"}}>
        Talk to Scout →
      </button>
    </div>
  </div>;
}


// ═══════════════════════════════════════════════════════════════════
// PAGE 3 — CHAT (DARK THEME, ANTHROPIC API)
// ═══════════════════════════════════════════════════════════════════

const PONDERING_LINES=["Reviewing building profile","Checking incentive eligibility","Mapping capital timing","Estimating energy baseline","Analyzing ownership dynamics","Matching regional programs","Building financial framing"];

const STATUS_LINES=["SCOUT IS ANALYZING CAPITAL TIMING AND DECISION DYNAMICS","SCOUT IS MAPPING INCENTIVE ELIGIBILITY FOR YOUR REGION","SCOUT IS BUILDING OWNERSHIP-SPECIFIC FINANCIAL FRAMING","SCOUT IS MATCHING PROGRAMS TO YOUR BUILDING PROFILE","SCOUT IS ESTIMATING ENERGY BASELINE FROM BUILDING DATA","SCOUT IS IDENTIFYING BUNDLING OPPORTUNITIES"];

function buildSystemPrompt(form){return `You are Scout — an AI-powered retrofit assessment advisor built by Gambit Technologies, funded by NRCan DRAI. You are currently in a short conversational intake with a building owner/manager BEFORE delivering their assessment dashboard.

=== YOUR VOICE ===

You sound like Stephen Dixon — a 45-year energy management veteran who puts the dollar sign at the center without being cynical. You're the knowledgeable colleague they wish they had.

Voice rules:
- SHORT SENTENCES. Punchy. Direct. No compound sentences with three clauses.
- Dollar signs before carbon. Always lead with financial framing.
- No jargon without translation. If you say "EUI," immediately explain it.
- Never say "simulation" — say "model" or "estimate."
- Never say "based on our analysis" — say "here's what I'm seeing."
- Never condescend. Treat everyone like a capable adult.
- Never apologize for assumptions. Flag them confidently.
- Humor is allowed sparingly. Be warm and human, not robotic.
- Never use the phrase "deep retrofit" unprompted. Lead with what they get.
- NEVER use emojis.
- Keep messages under 100 words. You're chatting, not writing essays.

Acknowledgment rotation (never repeat consecutively):
"Got it." / "That helps." / "Makes sense." / "Okay, that tells me a lot." / "Good — that changes the picture." / "That's useful to know."

=== CONVERSATION STRUCTURE ===

This conversation has exactly 4 phases. 5-8 total exchanges. Do NOT drag it out.

PHASE 1: GREETING + MIRROR (your first message)
- ONE message only
- Reference at least 3 specific things from their form data
- Include one observation that shows you're already working
- End with your first enrichment question in the same message
- Do NOT say "How can I help you today?"

PHASE 2: ENRICHMENT (2-3 messages from you)
- ONE question per message. NEVER two.
- Brief validation of their answer before the next question
- If they say "I don't know," estimate and move on.
- Questions to pick from based on gaps:
  Q1: Annual energy cost (gas + electric) — ask if not provided
  Q2: Heating system age / last replacement — ask almost always
  Q3: Are you presenting to the board yourself, or building a package for someone else?
  Q4: Has a specific budget number been discussed?
  Q5: Any past major building project experience?
  Q6: Any timeline deadlines?
  Ask Q1 and Q2 almost every time. Q3 when role is ambiguous.

PHASE 3: PROCESSING SIGNAL (1 message)
- Short. Signal you're building their assessment.
- Reference what you now know. Name what they're about to see.
- End with "Give me a moment to pull this together."

PHASE 4: TRANSITION (1-2 messages)
- Message 1: The headline — what you found, why it matters for THEM
- Message 2 (if needed): What's on their dashboard, what to look at first
- End with: "Your results are ready — click See Results above whenever you're ready."

=== ANTI-PATTERNS ===
- Never ask 2 questions in one message
- Never open with "How can I help you today?"
- Never use "simulation"
- Never list more than 3 things in a message
- Never use bullet points in chat
- Never exceed 100 words per message

=== USER'S FORM DATA ===
Address: ${form.address}, ${form.city}, ON ${form.postal}
Building Type: ${form.buildingType}
Business Operating: ${form.businessType||"Not specified"}
Year Built: ${form.yearBuilt} (~${form.buildingAge} years old)
Size: ${form.size}
Climate Zone: ${form.climateZone}
Region: ${form.region}
LDC: ${form.ldc}
Gas Utility: ${form.gasUtility}
Ownership: ${form.ownershipType}
Role: ${form.role||"Not specified"}
Motivations: ${form.motivations?.join(", ")||"Not specified"}
Approach: ${form.approach}
Capital Work Planned: ${form.capitalPlan?.join(", ")||"Not specified"}
Energy Cost: ${form.energyCost||"NOT PROVIDED — ask about this"}
Disruption Sensitivity: ${form.disruptionSensitivity||"Not specified"}
Debt Comfort: ${form.debtComfort||"Not specified"}

=== BEGIN ===
Start with Phase 1. Greeting + mirror + first enrichment question. Go.`;}

function ScoutAvatar({size=34}){
  return <img src={SCOUT_IMG_SM} alt="Scout" style={{width:size,height:size,borderRadius:size*0.28,flexShrink:0,objectFit:"cover"}}/>;
}

function PonderingIndicator(){
  const [lineIdx,setLineIdx]=useState(0);
  const [dots,setDots]=useState(0);
  useEffect(()=>{
    const d=setInterval(()=>setDots(x=>(x+1)%4),400);
    const l=setInterval(()=>setLineIdx(x=>(x+1)%PONDERING_LINES.length),2800);
    return()=>{clearInterval(d);clearInterval(l);};
  },[]);
  return <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
    <div style={{position:"relative"}}>
      <ScoutAvatar size={34}/>
      <div style={{position:"absolute",top:-2,right:-2,width:10,height:10,borderRadius:"50%",background:D.accent,animation:"orbitPulse 1.6s ease-in-out infinite",boxShadow:`0 0 6px ${D.accent}`}}/>
    </div>
    <div style={{padding:"12px 18px",borderRadius:"2px 14px 14px 14px",background:D.card,border:`1px solid ${D.border}`,minWidth:200}}>
      <div style={{display:"flex",gap:3,alignItems:"center",marginBottom:8,height:16}}>
        {Array.from({length:12}).map((_,i)=><div key={i} style={{width:3,borderRadius:2,background:D.accent,opacity:0.3+Math.random()*0.4,animation:`waveBar 0.8s ease-in-out ${i*0.07}s infinite alternate`}}/>)}
      </div>
      <div style={{fontSize:11,color:D.textMuted,fontWeight:500,display:"flex",alignItems:"center",gap:2}}>
        <span key={lineIdx} style={{animation:"fadeIn 0.3s ease"}}>{PONDERING_LINES[lineIdx]}</span>
        <span style={{width:20,textAlign:"left",color:D.textDim}}>{".".repeat(dots)}</span>
      </div>
    </div>
  </div>;
}

function ChatBubble({text,isScout}){
  if(isScout)return <div style={{display:"flex",gap:12,alignItems:"flex-start",animation:"fadeIn 0.3s ease"}}>
    <ScoutAvatar size={34}/>
    <div style={{flex:1,maxWidth:"calc(100% - 56px)",padding:"16px 20px",background:D.card,border:`1px solid ${D.border}`,
      borderRadius:"2px 14px 14px 14px",fontSize:14,color:D.text,lineHeight:1.75,whiteSpace:"pre-wrap"}}>{text}</div>
  </div>;
  return <div style={{display:"flex",justifyContent:"flex-end",animation:"fadeIn 0.2s ease"}}>
    <div style={{maxWidth:"78%",padding:"14px 18px",background:D.accentDim,border:`1px solid ${D.accentBorder}`,
      borderRadius:"14px 2px 14px 14px",fontSize:14,color:D.white,lineHeight:1.7,whiteSpace:"pre-wrap"}}>{text}</div>
  </div>;
}

function ChatPage({formData,onResults}){
  const [messages,setMessages]=useState([]);
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);
  const [confidence,setConfidence]=useState(42);
  const [chatGains,setChatGains]=useState(0);
  const [scoutMsgCount,setScoutMsgCount]=useState(0);
  const [dashReady,setDashReady]=useState(false);
  const [statusIdx,setStatusIdx]=useState(0);
  const scrollRef=useRef(null);
  const inputRef=useRef(null);
  const convRef=useRef([]);
  const startedRef=useRef(false);

  useEffect(()=>{if(!startedRef.current){startedRef.current=true;callScout();}},[]);
  useEffect(()=>{const t=setInterval(()=>setStatusIdx(i=>(i+1)%STATUS_LINES.length),4000);return()=>clearInterval(t);},[]);
  useEffect(()=>{if(scrollRef.current)scrollRef.current.scrollTop=scrollRef.current.scrollHeight;},[messages,loading]);
  useEffect(()=>{if(scoutMsgCount>=4&&!dashReady)setTimeout(()=>setDashReady(true),1500);},[scoutMsgCount]);

  const confColor=confidence>=60?D.accent:confidence>=40?D.warning:D.red;

  const updateConfidence=(msg)=>{
    const l=msg.toLowerCase();let g=0;
    if(l.match(/\$[\d,]+|[\d,]+\s*(k|thousand|per year|annually|\/yr)/))g+=12;
    if(l.match(/(replaced|installed|original|19\d{2}|20[012]\d|years?\s*old)/))g+=8;
    if(l.match(/(present|board|package|cfo|leadership)/))g+=3;
    if(l.match(/(budget|\$\d|million|hundred)/))g+=5;
    if(g>0){const next=Math.min(chatGains+g,36);setChatGains(next);setConfidence(Math.min(42+next,78));}
  };

  const callScout=async(userMsg=null)=>{
    setLoading(true);
    if(userMsg)convRef.current.push({role:"user",content:userMsg});
    const msgs=[...convRef.current];
    if(msgs.length===0){
      msgs.push({role:"user",content:"[User completed intake form and clicked 'Talk to Scout'. Begin Phase 1.]"});
      convRef.current.push(msgs[0]);
    }
    try{
      const res=await fetch("/api/claude",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:800,system:buildSystemPrompt(formData),messages:msgs}),
      });
      const data=await res.json();
      const text=data.content?.filter(b=>b.type==="text").map(b=>b.text).join("\n")||"Connection issue — try again in a moment.";
      convRef.current.push({role:"assistant",content:text});
      setMessages(p=>[...p,{text,isScout:true}]);
      setScoutMsgCount(p=>p+1);
    }catch{
      setMessages(p=>[...p,{text:"Connection issue — give me a second.",isScout:true}]);
    }
    setLoading(false);
    setTimeout(()=>inputRef.current?.focus(),100);
  };

  const send=()=>{
    if(!input.trim()||loading)return;
    const msg=input.trim();
    setMessages(p=>[...p,{text:msg,isScout:false}]);
    setInput("");updateConfidence(msg);callScout(msg);
  };

  return <div style={{height:"100vh",background:D.bg,color:D.white,fontFamily:"'DM Sans','Helvetica Neue',sans-serif",display:"flex",flexDirection:"column",overflow:"hidden"}}>
    {/* Top bar */}
    <div style={{padding:"14px 28px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:`1px solid ${D.border}`,flexShrink:0}}>
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        <img src={SCOUT_IMG_SM} alt="Scout" style={{width:34,height:34,borderRadius:9,objectFit:"cover",boxShadow:"0 2px 8px rgba(15,122,95,0.2)"}}/>
        <div>
          <div style={{fontSize:15,fontWeight:700,lineHeight:1.2}}>Scout Advisor</div>
          <div style={{fontSize:9,fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",color:D.accent,lineHeight:1}}>RETROFIT ASSESSMENT CONSULTANT</div>
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:20}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:9,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",color:D.textDim}}>CONFIDENCE</span>
          <div style={{width:80,height:5,borderRadius:3,background:"#E2E8F0",overflow:"hidden"}}>
            <div style={{width:`${confidence}%`,height:"100%",borderRadius:3,background:confColor,transition:"all 0.8s ease"}}/>
          </div>
          <span style={{fontSize:14,fontWeight:700,fontFamily:"'DM Mono',monospace",color:confColor,minWidth:36,textAlign:"right"}}>{confidence}%</span>
        </div>
        <button onClick={()=>onResults()} style={{
          padding:"9px 22px",borderRadius:8,border:"none",
          background:`linear-gradient(135deg, ${D.accent}, ${D.accentSolid})`,
          color:"#fff",fontSize:13,fontWeight:600,cursor:"pointer",
          fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",gap:6,
          boxShadow:"0 2px 8px rgba(15,122,95,0.25)",transition:"all 0.4s ease",
        }}>See Results <span style={{fontSize:15}}>&#8594;</span></button>
      </div>
    </div>

    {/* Chat area */}
    <div style={{flex:1,display:"flex",flexDirection:"column",maxWidth:780,width:"100%",margin:"0 auto",padding:"0 24px",overflow:"hidden"}}>
      <div ref={scrollRef} style={{flex:1,overflowY:"auto",padding:"24px 0",display:"flex",flexDirection:"column",gap:14}}>
        {messages.map((m,i)=><ChatBubble key={i} text={m.text} isScout={m.isScout}/>)}
        {loading&&<PonderingIndicator/>}
      </div>
      <div style={{flexShrink:0,paddingBottom:12,paddingTop:4}}>
        <div style={{display:"flex",gap:10,alignItems:"flex-end",background:D.bgAlt,border:`1px solid ${D.border}`,borderRadius:14,padding:"6px 6px 6px 16px"}}>
          <textarea ref={inputRef} value={input} onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}}
            placeholder="Type your response..." rows={1}
            style={{flex:1,padding:"10px 0",border:"none",background:"transparent",color:D.white,fontSize:14,
              fontFamily:"'DM Sans',sans-serif",resize:"none",outline:"none",lineHeight:1.5,minHeight:24,maxHeight:80}}
            onInput={e=>{e.target.style.height="auto";e.target.style.height=Math.min(e.target.scrollHeight,80)+"px";}}/>
          <button onClick={send} disabled={!input.trim()||loading} style={{
            width:42,height:42,borderRadius:10,border:"none",flexShrink:0,
            background:input.trim()&&!loading?`linear-gradient(135deg, ${D.accent}, ${D.accentSolid})`:"#E2E8F0",
            color:input.trim()&&!loading?"#fff":D.textDim,fontSize:18,cursor:input.trim()&&!loading?"pointer":"default",
            transition:"all 0.15s",display:"flex",alignItems:"center",justifyContent:"center",
          }}>&#9652;</button>
        </div>
      </div>
    </div>

    {/* Bottom status */}
    <div style={{padding:"10px 28px",borderTop:`1px solid ${D.border}`,display:"flex",justifyContent:"center",alignItems:"center",gap:8,flexShrink:0}}>
      <span style={{color:D.accent,fontSize:11}}>&#10023;</span>
      <span style={{fontSize:9,fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:D.textDim}}>{STATUS_LINES[statusIdx]}</span>
    </div>
  </div>;
}


// ═══════════════════════════════════════════════════════════════════
// PAGE 4 — DASHBOARD
// ═══════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════
// DASHBOARD HELPERS — Live links, downloads, mailto
// ═══════════════════════════════════════════════════════════════════

// URLs are hardcoded in INCENTIVE_PROGRAMS — no API call needed

function buildMailto(contact,building,pathway){
  const subject=encodeURIComponent(`Deep Retrofit Inquiry — ${building.address}, ${building.city}`);
  const body=encodeURIComponent(
`Hi ${contact.name.split(" ")[0]},

I am exploring a deep energy retrofit for a commercial building at ${building.address}, ${building.city}, ${building.province} ${building.postal}.

Building details:
- Type: ${building.type || "Commercial"}
- Size: ${building.sqft?.toLocaleString() || "N/A"} sqft
- Year built: ${building.yearBuilt || "N/A"}
- Ownership: ${building.ownershipType || "N/A"}

I have been using Scout (a retrofit assessment tool) and it identified ${pathway?.name || "retrofit pathways"} as a strong fit for this building. The assessment estimates ${pathway?.ghgReduction || "significant"} GHG reduction with ${fmt$(pathway?.incentiveEligible||0)} in potential incentive eligibility.

I would like to discuss next steps, specifically:
- Confirming program eligibility for my building
- Understanding the application timeline
- Any pre-requisites I should prepare

Would you have time for a brief call this week?

Best regards`);
  return `mailto:${contact.email}?subject=${subject}&body=${body}`;
}

function generateDocument(docName,building,baseline,pathway,carbon,confidence){
  const b=building,p=pathway;

  if(docName.includes("Handoff Export")){
    return JSON.stringify({building:b,baseline,pathway:{id:p.id,name:p.name,capitalCost:p.capitalCost,netCost:p.netCost,
      annualSavings:p.annualSavings,ghgReduction:p.ghgReduction,measures:p.measuresDetailed,incentives:p.incentives},
      carbon,confidence,generatedAt:new Date().toISOString()},null,2);
  }

  if(docName.includes("Business Case")||docName.includes("Feasibility")||docName.includes("One-Pager")){
    return `<h1 style="font-size:22px;border-bottom:2px solid #0F7A5F;padding-bottom:8px">${docName}</h1>
<p><strong>${b.address}</strong>, ${b.city}, ${b.province} ${b.postal}</p>
<table style="width:100%;border-collapse:collapse;margin:12px 0"><tr><th style="padding:8px 12px;text-align:left;border-bottom:1px solid #e2e8f0;background:#f8fafb;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;color:#64748b">Building Type</th><th style="padding:8px 12px;text-align:left;border-bottom:1px solid #e2e8f0;background:#f8fafb;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;color:#64748b">Year Built</th><th style="padding:8px 12px;text-align:left;border-bottom:1px solid #e2e8f0;background:#f8fafb;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;color:#64748b">Size</th><th style="padding:8px 12px;text-align:left;border-bottom:1px solid #e2e8f0;background:#f8fafb;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;color:#64748b">Annual Energy</th><th style="padding:8px 12px;text-align:left;border-bottom:1px solid #e2e8f0;background:#f8fafb;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;color:#64748b">Climate Zone</th></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${b.type||"Commercial"}</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${b.yearBuilt||"N/A"}</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${b.sqft?.toLocaleString()||"N/A"} sqft</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${fmt$(baseline.annualEnergyCost)}/yr</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${b.climateZone}</td></tr></table>

<h2 style="font-size:16px;color:#0F7A5F;margin-top:28px">Recommended Pathway: ${p.name}</h2>
<p>${p.summary}</p>
<table style="width:100%;border-collapse:collapse;margin:12px 0"><tr><th style="padding:8px 12px;text-align:left;border-bottom:1px solid #e2e8f0;background:#f8fafb;font-size:11px;text-transform:uppercase;color:#64748b">Metric</th><th style="padding:8px 12px;text-align:left;border-bottom:1px solid #e2e8f0;background:#f8fafb;font-size:11px;text-transform:uppercase;color:#64748b">Value</th></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">Estimated Capital Cost</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0"><strong>${fmt$(p.capitalCost)}</strong></td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">Incentive Eligible</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#0F7A5F;font-weight:700">${fmt$(p.incentiveEligible)}</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">Net Cost After Incentives</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0"><strong>${fmt$(p.netCost)}</strong></td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">Annual Energy Savings</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#0F7A5F;font-weight:700">${fmt$(p.annualSavings)}/yr</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">Simple Payback</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${p.payback}</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">GHG Reduction</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#0F7A5F;font-weight:700">${p.ghgReduction}</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">Carbon Tax Avoided</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${fmt$(carbon.annualExposure)}/yr at $${carbon.pricePerTonne}/tonne</td></tr></table>

<h2 style="font-size:16px;color:#0F7A5F;margin-top:28px">Ownership-Specific Framing</h2>
<p style="background:#f0fdf4;padding:12px 16px;border-radius:6px;border:1px solid #B4DDD0">${p.financials?.framing||""}</p>

<h2 style="font-size:16px;color:#0F7A5F;margin-top:28px">Included Measures</h2>
<ul>${p.measures.map(m=>"<li>"+m+"</li>").join("")}</ul>

<h2 style="font-size:16px;color:#0F7A5F;margin-top:28px">Eligible Incentive Programs</h2>
<table style="width:100%;border-collapse:collapse;margin:12px 0"><tr><th style="padding:8px 12px;text-align:left;border-bottom:1px solid #e2e8f0;background:#f8fafb;font-size:11px;text-transform:uppercase;color:#64748b">Program</th><th style="padding:8px 12px;text-align:left;border-bottom:1px solid #e2e8f0;background:#f8fafb;font-size:11px;text-transform:uppercase;color:#64748b">Organization</th><th style="padding:8px 12px;text-align:left;border-bottom:1px solid #e2e8f0;background:#f8fafb;font-size:11px;text-transform:uppercase;color:#64748b">Est. Amount</th><th style="padding:8px 12px;text-align:left;border-bottom:1px solid #e2e8f0;background:#f8fafb;font-size:11px;text-transform:uppercase;color:#64748b">Status</th></tr>
${p.incentives.map(inc=>"<tr><td style='padding:8px 12px;border-bottom:1px solid #e2e8f0'>"+inc.name+"</td><td style='padding:8px 12px;border-bottom:1px solid #e2e8f0'>"+inc.org+"</td><td style='padding:8px 12px;border-bottom:1px solid #e2e8f0'>"+(inc.isFinancing?"Low-interest financing":fmt$(inc.amount))+"</td><td style='padding:8px 12px;border-bottom:1px solid #e2e8f0'>"+inc.status+"</td></tr>").join("")}</table>

<h2 style="font-size:16px;color:#0F7A5F;margin-top:28px">Assessment Confidence</h2>
<p>${confidence.score}% — ${confidence.dataVsAssumptions}</p>
<div style="margin-top:40px;padding-top:16px;border-top:1px solid #e2e8f0;font-size:11px;color:#94a3b8">Generated by Scout · Gambit Technologies · ${new Date().toLocaleDateString()}<br>This assessment is for planning purposes only and does not constitute an engineering audit or financial guarantee.</div>`;
  }

  if(docName.includes("Engineering")||docName.includes("RFP")||docName.includes("Scope")){
    return `<h1 style="font-size:22px;border-bottom:2px solid #0F7A5F;padding-bottom:8px">${docName}</h1>
<h2 style="font-size:15px;color:#0F7A5F;margin-top:24px">Building Information</h2>
<table style="width:100%;border-collapse:collapse;margin:12px 0"><tr><th style="padding:8px 12px;text-align:left;border-bottom:1px solid #e2e8f0;background:#f8fafb;font-size:11px;text-transform:uppercase;color:#64748b">Field</th><th style="padding:8px 12px;text-align:left;border-bottom:1px solid #e2e8f0;background:#f8fafb;font-size:11px;text-transform:uppercase;color:#64748b">Value</th></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">Address</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${b.address}, ${b.city}, ${b.province} ${b.postal}</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">Building Type</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${b.type}</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">Year Built</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${b.yearBuilt||"Unknown"}</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">Gross Floor Area</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${b.sqft?.toLocaleString()||"Unknown"} sqft</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">Floors</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${b.floors||"Unknown"}</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">Climate Zone</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${b.climateZone}</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">Ownership</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${b.ownershipType}</td></tr></table>

<h2 style="font-size:15px;color:#0F7A5F;margin-top:24px">Energy Baseline</h2>
<table style="width:100%;border-collapse:collapse;margin:12px 0"><tr><th style="padding:8px 12px;text-align:left;border-bottom:1px solid #e2e8f0;background:#f8fafb;font-size:11px;text-transform:uppercase;color:#64748b">Metric</th><th style="padding:8px 12px;text-align:left;border-bottom:1px solid #e2e8f0;background:#f8fafb;font-size:11px;text-transform:uppercase;color:#64748b">Value</th><th style="padding:8px 12px;text-align:left;border-bottom:1px solid #e2e8f0;background:#f8fafb;font-size:11px;text-transform:uppercase;color:#64748b">Source</th></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">Annual Energy Cost</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${fmt$(baseline.annualEnergyCost)}/yr</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${baseline.costSource}</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">EUI</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${baseline.euiKwhPerSqft} kWh/sqft</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">Calculated</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">Annual Gas</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${baseline.gasM3?.toLocaleString()} m3</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">Estimated</td></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">Annual Electric</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${baseline.electricKwh?.toLocaleString()} kWh</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">Estimated</td></tr></table>

<h2 style="font-size:15px;color:#0F7A5F;margin-top:24px">Proposed Scope: ${p.name}</h2>
<table style="width:100%;border-collapse:collapse;margin:12px 0"><tr><th style="padding:8px 12px;text-align:left;border-bottom:1px solid #e2e8f0;background:#f8fafb;font-size:11px;text-transform:uppercase;color:#64748b">Measure</th><th style="padding:8px 12px;text-align:left;border-bottom:1px solid #e2e8f0;background:#f8fafb;font-size:11px;text-transform:uppercase;color:#64748b">Estimated Cost</th></tr>
${p.measuresDetailed?.map(m=>"<tr><td style='padding:8px 12px;border-bottom:1px solid #e2e8f0'>"+m.name+"</td><td style='padding:8px 12px;border-bottom:1px solid #e2e8f0'>"+fmt$(m.cost)+"</td></tr>").join("")||""}</table>
<p><strong>Total estimated capital cost: ${fmt$(p.capitalCost)}</strong></p>
<p>GHG reduction: ${p.ghgReduction}. Annual savings: ${fmt$(p.annualSavings)}/yr.</p>
<div style="margin-top:40px;padding-top:16px;border-top:1px solid #e2e8f0;font-size:11px;color:#94a3b8">Generated by Scout · Gambit Technologies · ${new Date().toLocaleDateString()}<br>For engineering partner intake. Assessment-grade — not a substitute for detailed energy audit.</div>`;
  }

  return `<h1>${docName}</h1><p>Building: ${b.address}, ${b.city}</p><p>Pathway: ${p.name}</p>
<p>Capital Cost: ${fmt$(p.capitalCost)} | Net: ${fmt$(p.netCost)} | Savings: ${fmt$(p.annualSavings)}/yr</p>
<p>Generated by Scout · ${new Date().toLocaleDateString()}</p>`;
}

function generateFullExportHtml(assessment){
  const {building:b,baseline,pathways,carbon,confidence,triggers}=assessment;
  return `<h1 style="font-size:24px;color:#0F7A5F;border-bottom:3px solid #0F7A5F;padding-bottom:10px">Scout Retrofit Assessment</h1>
<p><strong style="font-size:20px">${b.address}</strong><br>${b.city}, ${b.province} ${b.postal}</p>
<table style="width:100%;border-collapse:collapse;margin:12px 0"><tr><th style="padding:8px 12px;text-align:left;border-bottom:1px solid #e2e8f0;background:#f0fdf4;font-size:11px;text-transform:uppercase;color:#0F7A5F">Type</th><th style="padding:8px 12px;text-align:left;border-bottom:1px solid #e2e8f0;background:#f0fdf4;font-size:11px;text-transform:uppercase;color:#0F7A5F">Age</th><th style="padding:8px 12px;text-align:left;border-bottom:1px solid #e2e8f0;background:#f0fdf4;font-size:11px;text-transform:uppercase;color:#0F7A5F">Size</th><th style="padding:8px 12px;text-align:left;border-bottom:1px solid #e2e8f0;background:#f0fdf4;font-size:11px;text-transform:uppercase;color:#0F7A5F">Energy</th><th style="padding:8px 12px;text-align:left;border-bottom:1px solid #e2e8f0;background:#f0fdf4;font-size:11px;text-transform:uppercase;color:#0F7A5F">EUI</th></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${b.type}</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${b.buildingAge} yrs (${b.yearBuilt})</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${b.sqft?.toLocaleString()} sqft</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${fmt$(baseline.annualEnergyCost)}/yr</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${baseline.euiKwhPerSqft} kWh/sqft</td></tr></table>

<h2 style="font-size:16px;color:#0F7A5F;margin-top:28px">Carbon Profile</h2>
<p>Total emissions: ${carbon.totalEmissions} tCO2e/yr. Carbon tax exposure: ${fmt$(carbon.annualExposure)}/yr at $${carbon.pricePerTonne}/tonne.</p>

<h2 style="font-size:16px;color:#0F7A5F;margin-top:28px">Capital Timing Triggers</h2>
<table style="width:100%;border-collapse:collapse;margin:12px 0"><tr><th style="padding:8px 12px;text-align:left;border-bottom:1px solid #e2e8f0;background:#f8fafb;font-size:11px;text-transform:uppercase;color:#64748b">System</th><th style="padding:8px 12px;text-align:left;border-bottom:1px solid #e2e8f0;background:#f8fafb;font-size:11px;text-transform:uppercase;color:#64748b">Median Life</th><th style="padding:8px 12px;text-align:left;border-bottom:1px solid #e2e8f0;background:#f8fafb;font-size:11px;text-transform:uppercase;color:#64748b">Status</th></tr>
${triggers.map(t=>"<tr><td style='padding:8px 12px;border-bottom:1px solid #e2e8f0'>"+t.name+"</td><td style='padding:8px 12px;border-bottom:1px solid #e2e8f0'>"+t.medianLife+" yrs</td><td style='padding:8px 12px;border-bottom:1px solid #e2e8f0'><strong>"+(t.status==="critical"?"PAST END-OF-LIFE":t.status==="warning"?"APPROACHING":"OK")+"</strong></td></tr>").join("")}</table>

${pathways.map(p=>`<h2 style="font-size:18px;color:#0F7A5F;margin-top:32px;border-bottom:1px solid #e2e8f0;padding-bottom:6px">${p.name} <span style="color:#64748b;font-size:13px">(${p.tag})</span></h2>
<p>${p.summary}</p>
<div style="background:#f0fdf4;padding:12px 16px;border-radius:6px;border:1px solid #B4DDD0;margin:12px 0">${p.whyForYou}</div>
<table style="width:100%;border-collapse:collapse;margin:12px 0"><tr><th style="padding:8px 12px;text-align:left;border-bottom:1px solid #e2e8f0;background:#f8fafb;font-size:11px;text-transform:uppercase;color:#64748b">Capital</th><th style="padding:8px 12px;text-align:left;border-bottom:1px solid #e2e8f0;background:#f8fafb;font-size:11px;text-transform:uppercase;color:#64748b">Incentives</th><th style="padding:8px 12px;text-align:left;border-bottom:1px solid #e2e8f0;background:#f8fafb;font-size:11px;text-transform:uppercase;color:#64748b">Net</th><th style="padding:8px 12px;text-align:left;border-bottom:1px solid #e2e8f0;background:#f8fafb;font-size:11px;text-transform:uppercase;color:#64748b">Savings</th><th style="padding:8px 12px;text-align:left;border-bottom:1px solid #e2e8f0;background:#f8fafb;font-size:11px;text-transform:uppercase;color:#64748b">Payback</th><th style="padding:8px 12px;text-align:left;border-bottom:1px solid #e2e8f0;background:#f8fafb;font-size:11px;text-transform:uppercase;color:#64748b">GHG</th></tr>
<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${fmt$(p.capitalCost)}</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#0F7A5F;font-weight:700">${fmt$(p.incentiveEligible)}</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${fmt$(p.netCost)}</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#0F7A5F;font-weight:700">${fmt$(p.annualSavings)}/yr</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0">${p.payback}</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#0F7A5F;font-weight:700">${p.ghgReduction}</td></tr></table>
<p><strong>Measures:</strong> ${p.measures.join("; ")}</p>
<p><em>Framing:</em> ${p.financials?.framing||""}</p>`).join("")}

<h2 style="font-size:16px;color:#0F7A5F;margin-top:28px">Confidence: ${confidence.score}%</h2>
<p>${confidence.dataVsAssumptions}</p>
<div style="margin-top:40px;font-size:11px;color:#94a3b8;border-top:1px solid #e2e8f0;padding-top:16px">Generated by Scout · Gambit Technologies · ${new Date().toLocaleDateString()}<br>Assessment-grade estimates. Not a substitute for engineering audit.<br>Funded by NRCan DRAI</div>`;
}


function Dashboard({assessment,onBack,setDocPreview}){
  const {building:b,baseline,pathways,carbon,confidence,triggers,partners,envelope}=assessment;
  const [activeTab,setActiveTab]=useState("essential");
  const [activeSection,setActiveSection]=useState("overview");
  const [expanded,setExpanded]=useState(false);
  const [chatOpen,setChatOpen]=useState(false);
  const [chatMsgs,setChatMsgs]=useState([]);
  const [chatInput,setChatInput]=useState("");
  const [chatLoading,setChatLoading]=useState(false);
  const chatScrollRef=useRef(null);
  const chatInputRef=useRef(null);
  const chatConvRef=useRef([]);
  const pathway=pathways.find(p=>p.id===activeTab);
  const sections=[{id:"overview",label:"Overview",icon:"◎"},{id:"funding",label:"Funding",icon:"$"},{id:"case",label:"Business Case",icon:"✦"},{id:"outputs",label:"Outputs",icon:"↓"},{id:"contacts",label:"Contacts",icon:"☎"},{id:"next",label:"Next Steps",icon:"→"}];

  const outputDocs={
    essential:[
      {name:"Equipment Replacement Business Case",type:"PDF",pct:85,desc:"One-pager for investment board. Avoided emergency cost + rebate capture."},
      {name:"Enbridge Custom Application",type:"Form",pct:70,desc:"Pre-populated with building data, equipment specs, estimated savings."},
      {name:"Contractor RFP Package",type:"DOCX",pct:50,desc:"Scope of work and specifications for contractor bidding."},
    ],
    targeted:[
      {name:"Targeted Decarbonization Business Case",type:"PDF",pct:82,desc:"For investment board. DRAI threshold, asset value uplift, NOI impact."},
      {name:"NRCan DRAI Application Draft",type:"Form",pct:65,desc:"Pre-populated with building profile, energy baseline, proposed measures."},
      {name:"Enbridge Custom Application",type:"Form",pct:70,desc:"Pre-populated with building data and estimated savings."},
      {name:"Engineering Scope Brief",type:"DOCX",pct:55,desc:"Proposed measures and building data for engineering partner intake."},
    ],
    deep:[
      {name:"Deep Retrofit Feasibility Analysis",type:"PDF",pct:80,desc:"Phased feasibility with 20-year cashflow and NOI impact."},
      {name:"Internal Business Case One-Pager",type:"PDF",pct:90,desc:"Board-ready summary with ownership-specific framing."},
      {name:"NRCan DRAI Application Draft",type:"Form",pct:65,desc:"Pre-populated with building profile and proposed measures."},
      {name:"CIB Financing Summary",type:"PDF",pct:75,desc:"Building financial profile for CIB retrofit financing intake."},
      {name:"Partner Contact Package",type:"Emails",pct:100,desc:"Pre-written emails personalized to this building."},
      {name:"Engineering Handoff Export",type:"JSON/CSV",pct:100,desc:"All building data in structured format for engineering partner."},
    ],
  };
  const pathwayContacts=partners.all.filter(c=>c.pathways[0]==="all"||c.pathways.includes(activeTab));

  // Sidebar chat logic
  useEffect(()=>{if(chatScrollRef.current)chatScrollRef.current.scrollTop=chatScrollRef.current.scrollHeight;},[chatMsgs,chatLoading]);
  useEffect(()=>{if(chatOpen)setTimeout(()=>chatInputRef.current?.focus(),200);},[chatOpen]);

  const sidebarSystemPrompt=`You are Scout, an AI deep energy retrofit advisor built by Gambit Technologies. You are embedded as a sidebar consultant on the user's retrofit assessment dashboard. Be conversational, concise (under 80 words), and helpful. You have full context of their assessment.

BUILDING: ${b.address}, ${b.city}, ${b.province||"ON"}. ${b.type}, ${b.sqft?.toLocaleString()} sqft, ~${b.buildingAge} yrs old.
ENERGY: ${fmt$(baseline.annualEnergyCost)}/yr, ${baseline.euiKwhPerSqft} kWh/sqft.
OWNERSHIP: ${OWNERSHIP_TYPES.find(x=>x.id===b.ownershipType)?.label||b.ownershipType}. LDC: ${b.ldc}. Gas: ${b.gasUtility}.
CARBON: ${fmt$(carbon.annualExposure)}/yr exposure at $${CARBON.pricePerTonne}/tonne.
TRIGGERS: ${triggers.map(t=>`${t.name} (${t.status}, ~${t.estimatedAge}yr old)`).join(", ")}.

CURRENT VIEW: Pathway "${pathway?.name}" — ${activeSection} tab.

PATHWAYS:
${pathways.map(p=>`• ${p.name}: ${fmt$(p.capitalCost)} capital, ${fmt$(p.netCost)} net, ${fmt$(p.annualSavings)}/yr savings, ${p.ghgReduction} GHG, ${p.payback} payback, ${fmt$(p.incentiveEligible)} incentives
  Programs: ${p.incentives.map(inc=>`${inc.name} (${inc.isFinancing?"financing":fmt$(inc.amount)})`).join(", ")}`).join("\n")}

You can help the user: understand their results, compare pathways, explain incentives, draft emails to partners, clarify next steps, interpret financial metrics, or explore what-if scenarios. Be direct and specific to THEIR building. Never say "I don't have access to" — you have everything.`;

  const sendChat=async(directMsg=null)=>{
    const msg=directMsg||chatInput.trim();
    if(!msg||chatLoading)return;
    setChatMsgs(p=>[...p,{text:msg,isScout:false}]);
    if(!directMsg)setChatInput("");
    setChatLoading(true);
    chatConvRef.current.push({role:"user",content:msg});
    try{
      const res=await fetch("/api/claude",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:600,system:sidebarSystemPrompt,messages:[...chatConvRef.current]}),
      });
      const data=await res.json();
      const text=data.content?.filter(b=>b.type==="text").map(b=>b.text).join("\n")||"Connection issue — try again.";
      chatConvRef.current.push({role:"assistant",content:text});
      setChatMsgs(p=>[...p,{text,isScout:true}]);
    }catch{setChatMsgs(p=>[...p,{text:"Connection issue — give me a second.",isScout:true}]);}
    setChatLoading(false);setTimeout(()=>chatInputRef.current?.focus(),100);
  };

  return <div style={{position:"relative"}}>
  <div style={{maxWidth:1280,margin:"0 auto",padding:"0 32px",transition:"margin-right 0.3s ease",marginRight:chatOpen?380:0}}>
    <div style={{padding:"16px 0 12px"}}>
      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:6}}>
        <h1 style={{fontSize:24,fontWeight:700,margin:0,letterSpacing:"-0.02em"}}>{b.address}</h1>
        <button onClick={onBack} style={{marginLeft:"auto",padding:"5px 12px",borderRadius:8,border:`1px solid ${C.border}`,background:"transparent",color:C.textMuted,fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>← Edit inputs</button>
      </div>
      <div style={{display:"flex",gap:12,flexWrap:"wrap",fontSize:11,color:C.textMuted}}>
        {[b.type,BUSINESS_TYPES.find(x=>x.id===b.businessType)?.label,b.buildingAge?`~${b.buildingAge} yrs`:"",`${b.sqft?.toLocaleString()} sqft`,
          fmt$(baseline.annualEnergyCost)+"/yr",OWNERSHIP_TYPES.find(x=>x.id===b.ownershipType)?.label,b.ldc].filter(Boolean).map((v,i)=>
          <span key={i} style={{fontWeight:500,color:C.text}}>{v}</span>
        )}
        {triggers.slice(0,3).map((t,i)=>{
          const col=t.status==="critical"?C.red:t.status==="warning"?C.warning:C.textMuted;
          const bg=t.status==="critical"?C.redLight:t.status==="warning"?C.warningLight:C.cardInner;
          return <span key={`t${i}`} style={{fontSize:10,padding:"2px 8px",borderRadius:99,background:bg,border:`1px solid ${col}22`,color:col}}>
            {t.status==="critical"?"⚠ ":""}{t.name}
          </span>;
        })}
      </div>
    </div>

    {/* ═══ SCOUT MESSAGE — bridge from chat to results ═══ */}
    <Card style={{marginBottom:14,border:`1px solid ${C.accentBorder}`,background:`linear-gradient(135deg, ${C.accentLight}, #F0FDF4)`}}>
      <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
        <img src={SCOUT_IMG_SM} alt="Scout" style={{width:34,height:34,borderRadius:9,objectFit:"cover",flexShrink:0}}/>
        <div style={{flex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:5}}>
            <span style={{fontSize:13,fontWeight:700}}>Scout</span>
            <span style={{fontSize:8,fontWeight:600,letterSpacing:"0.05em",padding:"2px 6px",borderRadius:99,background:C.accentLight,color:C.accent,border:`1px solid ${C.accentBorder}`}}>AI ASSESSMENT</span>
          </div>
          <div style={{fontSize:13,color:C.text,lineHeight:1.7}}>
            I've analyzed <strong>{b.address}</strong>.
            {triggers.filter(t=>t.status==="critical").length>0&&` You have ${triggers.filter(t=>t.status==="critical").length} system${triggers.filter(t=>t.status==="critical").length>1?"s":""} past end-of-life — that's both urgency and opportunity.`}
            {" "}You're spending <strong style={{color:C.accent}}>{fmt$(baseline.annualEnergyCost)}/yr</strong> on energy ({baseline.euiKwhPerSqft} kWh/sqft — {baseline.euiKwhPerSqft>25?"well above":"near"} benchmark). I've mapped three pathways below.
            {b.ownershipType==="portfolio"&&" Financials are framed around asset value, NOI, and carbon tax exposure."}
            {b.ownershipType==="condo"&&" Financials are framed around per-unit costs and common fee impact."}
            {b.ownershipType==="municipality"&&" Financials are framed around operating budget relief and grant coverage."}
            {b.ownershipType==="smallLandlord"&&" Financials are framed around out-of-pocket cost, monthly savings, and payback."}
          </div>
          {expanded&&<div style={{fontSize:12,color:C.textMuted,lineHeight:1.7,marginTop:8,paddingTop:8,borderTop:`1px solid ${C.accentBorder}`}}>
            You're in {b.ldc}'s territory — prescriptive rebates not available elsewhere. Carbon tax exposure: {fmt$(carbon.annualExposure)}/yr at {"$"}{CARBON.pricePerTonne}/tonne and rising. {Object.values(outputDocs).flat().length} documents are pre-populated and ready to download.
          </div>}
          <button onClick={()=>setExpanded(!expanded)} style={{marginTop:6,padding:0,border:"none",background:"transparent",color:C.accent,fontSize:11,fontWeight:500,cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontFamily:"inherit"}}>
            {expanded?"Show less":"More details"}
            <span style={{fontSize:9,transform:expanded?"rotate(180deg)":"rotate(0deg)",transition:"transform 0.2s",display:"inline-block"}}>▼</span>
          </button>
        </div>
      </div>
    </Card>

    {/* ═══ STICKY NAV — pathway selector + section tabs ═══ */}
    <div style={{position:"sticky",top:44,zIndex:40,background:C.bg,borderBottom:`1px solid ${C.border}`,margin:"0 -32px",padding:"0 32px"}}>
      {/* Label + Pathway selector row */}
      <div style={{display:"flex",alignItems:"center",gap:8,padding:"10px 0 6px"}}>
        <span style={{fontSize:10,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:C.textMuted}}>Scout's Strategic Options</span>
        <div style={{flex:1,height:1,background:C.border}}/>
      </div>
      <div style={{display:"flex",gap:6,paddingBottom:0}}>
        {pathways.map(p=>{const a=p.id===activeTab;return <button key={p.id} onClick={()=>{setActiveTab(p.id);setActiveSection("overview");}}
          style={{flex:1,padding:"8px 12px",borderRadius:"10px 10px 0 0",textAlign:"left",cursor:"pointer",transition:"all 0.15s",fontFamily:"inherit",
            border:a?`1px solid ${C.border}`:`1px solid transparent`,borderBottom:a?`1px solid ${C.bg}`:`1px solid transparent`,
            background:a?C.bg:C.bgSoft,position:"relative",marginBottom:-1}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <div style={{width:3,height:14,borderRadius:2,background:a?p.tagColor:"transparent"}}/>
              <span style={{fontSize:12,fontWeight:a?700:500,color:a?C.dark:C.textMuted}}>{p.name}</span>
            </div>
            <span style={{fontSize:7,fontWeight:700,letterSpacing:"0.05em",padding:"2px 5px",borderRadius:3,background:`${p.tagColor}18`,color:p.tagColor,whiteSpace:"nowrap"}}>{p.tag}</span>
          </div>
          <div style={{display:"flex",gap:8,fontSize:11,marginTop:2,paddingLeft:9}}>
            <span style={{color:C.accent,fontWeight:600}}>{fmt$(p.annualSavings)}/yr</span>
            <span style={{color:C.textDim}}>{p.payback}</span>
          </div>
        </button>;})}
      </div>
      {/* Section tabs row */}
      <div style={{display:"flex",gap:0,overflowX:"auto"}}>
        {sections.map(s=>{const a=s.id===activeSection;return <button key={s.id} onClick={()=>setActiveSection(s.id)}
          style={{padding:"10px 16px",border:"none",background:"transparent",color:a?C.accent:C.textMuted,
            fontSize:12,fontWeight:a?600:400,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"inherit",
            borderBottom:a?`2px solid ${C.accent}`:"2px solid transparent",marginBottom:-1,transition:"all 0.12s"}}>
          <span style={{marginRight:4,opacity:0.5}}>{s.icon}</span>{s.label}
        </button>;})}
      </div>
    </div>

    {/* ═══ CONTENT AREA ═══ */}
    <div style={{padding:"20px 0"}}>

    {/* ═══ OVERVIEW ═══ */}
    {activeSection==="overview"&&<div>
      {/* Why this pathway */}
      <div style={{padding:"10px 14px",borderRadius:8,background:`${pathway.tagColor}08`,border:`1px solid ${pathway.tagColor}25`,marginBottom:14,display:"flex",gap:10}}>
        <span style={{color:pathway.tagColor,fontSize:13,marginTop:1}}>✦</span>
        <div style={{fontSize:12,color:C.text,lineHeight:1.6}}>
          <strong>Why this for you:</strong> {pathway.whyForYou}
          {pathway.financials?.framing&&<span style={{color:C.textMuted}}>{" "}— {pathway.financials.framing}</span>}
        </div>
      </div>

      {/* Two-column overview content */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        <Card>
          <div style={{fontSize:12,color:C.text,lineHeight:1.7,marginBottom:14}}>{pathway.summary}</div>
          <SectionHead icon="⚡" label="Included Measures"/>
          <div style={{display:"flex",flexDirection:"column",gap:7}}>
            {pathway.measures.map((m,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,fontSize:12,color:C.text}}>
              <div style={{width:6,height:6,borderRadius:99,background:C.accent,flexShrink:0}}/>{m}
            </div>)}
          </div>
        </Card>
        {pathway.routing==="turnkey"&&<Card style={{border:`1px solid ${C.blueBorder}`,background:C.blueLight}}>
          <span style={{fontSize:10,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",color:C.blue}}>Turnkey Partner Available</span>
          <div style={{fontSize:14,fontWeight:600,marginTop:5}}>Efficiency Capital</div>
          <div style={{fontSize:12,color:C.textMuted,lineHeight:1.5,marginTop:2}}>{partners.turnkey?.turnkeyDesc}</div>
        </Card>}
        {/* Sequential retrofit bridge — Principle 4: Gateway Drug */}
        {pathway.id==="essential"&&<Card style={{border:`1px solid ${C.warningBorder}`,background:C.warningLight}}>
            <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",color:C.warning,marginBottom:6}}>If You Go Further</div>
            <div style={{fontSize:12,color:C.text,lineHeight:1.6}}>
              You are addressing the urgent equipment now. If you also tackle envelope improvements in 2-3 years when systems are due, you would step up to <strong>{pathways.find(p=>p.id==="targeted")?.name}</strong> -- unlocking {fmt$(pathways.find(p=>p.id==="targeted")?.incentiveEligible||0)} in incentives and hitting the {pathways.find(p=>p.id==="targeted")?.ghgReduction} GHG reduction threshold.
            </div>
            <button onClick={()=>{setActiveTab("targeted");setActiveSection("overview");}} style={{marginTop:8,padding:"6px 14px",borderRadius:8,border:`1px solid ${C.warningBorder}`,background:"transparent",color:C.warning,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
              See Targeted Decarbonization →
            </button>
        </Card>}
        {pathway.id==="targeted"&&<Card style={{border:`1px solid ${C.warningBorder}`,background:C.warningLight}}>
            <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",color:C.warning,marginBottom:6}}>If You Go Further</div>
            <div style={{fontSize:12,color:C.text,lineHeight:1.6}}>
              You are addressing equipment and envelope now. If you also pursue electrification in Phase 3, you would step up to <strong>{pathways.find(p=>p.id==="deep")?.name}</strong> -- unlocking {fmt$(pathways.find(p=>p.id==="deep")?.incentiveEligible||0)} in incentives and qualifying for CIB financing at 1% interest that covers all phases.
            </div>
            <button onClick={()=>{setActiveTab("deep");setActiveSection("overview");}} style={{marginTop:8,padding:"6px 14px",borderRadius:8,border:`1px solid ${C.warningBorder}`,background:"transparent",color:C.warning,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
              See Phased Deep Retrofit →
            </button>
        </Card>}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        <Card style={{background:"linear-gradient(135deg, #E6F5F0, #F0FDF4)"}}>
          <SectionHead icon="$" label="Financial Summary"/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
            <StatBlock label="Capital Cost" value={fmt$(pathway.capitalCost)} large/>
            <StatBlock label="Incentive Eligible" value={fmt$(pathway.incentiveEligible)} large highlight/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
            <StatBlock label="Net Cost" value={fmt$(pathway.netCost)}/>
            <StatBlock label="Payback" value={pathway.payback}/>
            <StatBlock label="Annual Savings" value={fmt$(pathway.annualSavings)} highlight/>
          </div>
        </Card>
        <Card>
          <SectionHead icon="🌿" label="Carbon Impact"/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            <StatBlock label="GHG Reduction" value={pathway.ghgReduction} large highlight/>
            <StatBlock label="tCO2e Avoided/Yr" value={pathway.carbonReduction} large/>
          </div>
          <div style={{marginTop:12,padding:"10px 14px",background:C.accentLight,borderRadius:8,fontSize:12,color:C.accent,lineHeight:1.5}}>
            Equivalent to removing {Math.round(pathway.carbonReduction/CARBON.carEquiv)} cars. Carbon tax: {fmt$(carbon.annualExposure)}/yr at {"$"}{CARBON.pricePerTonne}/tonne.
          </div>
        </Card>
        <Card style={{padding:14}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
            <span style={{fontSize:10,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",color:C.textMuted}}>Assessment Confidence</span>
            <span style={{fontSize:18,fontWeight:700,color:confidence.level==="high"?C.accent:confidence.level==="moderate"?C.warning:C.red}}>{confidence.score}%</span>
          </div>
          <div style={{height:5,background:C.cardInner,borderRadius:3,overflow:"hidden",marginBottom:6}}>
            <div style={{width:`${confidence.score}%`,height:"100%",background:confidence.level==="high"?C.accent:confidence.level==="moderate"?C.warning:C.red,borderRadius:3}}/>
          </div>
          <div style={{fontSize:11,color:C.textMuted,lineHeight:1.5}}>{confidence.dataVsAssumptions}</div>
          <div style={{marginTop:8,padding:"8px 12px",background:C.bgSoft,borderRadius:6,fontSize:11,color:C.textMuted}}>
            <strong style={{color:C.text}}>Improve accuracy:</strong> Upload utility bills (+15%), ESPM data (+12%), or a building condition assessment (+8%)
          </div>
        </Card>
      </div>
    </div></div>}

    {/* ═══ FUNDING ═══ */}
    {activeSection==="funding"&&(()=>{
      const grants=pathway.incentives.filter(x=>!x.isFinancing&&!x.isAnnual);
      const annual=pathway.incentives.filter(x=>x.isAnnual);
      const financing=pathway.incentives.filter(x=>x.isFinancing);
      const progSections=[
        {key:"ieso",label:"IESO Save on Energy",color:C.accent},
        {key:"enbridge",label:"Enbridge Gas",color:"#F59E0B"},
        {key:"federal",label:"Federal Programs",color:C.red},
        {key:"specialist",label:"Specialist & Regional",color:C.blue},
      ];
      const grouped=progSections.map(s=>({...s,programs:pathway.incentives.filter(p=>p.section===s.key)})).filter(s=>s.programs.length>0);
      const hasFoodService=pathway.incentives.some(p=>p.key==="enbridge_prescriptive");
      // Stacking sequence for this pathway
      const stackSeq=pathway.incentives.filter(x=>!x.isFinancing).sort((a,b)=>(a.stackOrder||5)-(b.stackOrder||5));
      
      return <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:16}}>
        <Card style={{padding:14,background:`linear-gradient(135deg, ${C.accentLight}, #F0FDF4)`}}>
          <div style={{fontSize:9,fontWeight:600,letterSpacing:"0.07em",textTransform:"uppercase",color:C.textMuted,marginBottom:3}}>Grants & Credits</div>
          <div style={{fontSize:22,fontWeight:700,color:C.accent}}>{fmt$(pathway.incentiveEligible)}</div>
          <div style={{fontSize:11,color:C.textMuted}}>{grants.length} programs</div>
        </Card>
        <Card style={{padding:14,background:C.blueLight}}>
          <div style={{fontSize:9,fontWeight:600,letterSpacing:"0.07em",textTransform:"uppercase",color:C.textMuted,marginBottom:3}}>Annual Performance</div>
          <div style={{fontSize:22,fontWeight:700,color:C.blue}}>{annual.length>0?fmt$(annual.reduce((s,a)=>s+(a.amount||0),0))+"/yr":"—"}</div>
          <div style={{fontSize:11,color:C.textMuted}}>{annual.length} programs</div>
        </Card>
        <Card style={{padding:14}}>
          <div style={{fontSize:9,fontWeight:600,letterSpacing:"0.07em",textTransform:"uppercase",color:C.textMuted,marginBottom:3}}>Financing Available</div>
          <div style={{fontSize:22,fontWeight:700,color:C.dark}}>{financing.length}</div>
          <div style={{fontSize:11,color:C.textMuted}}>Sub-commercial rate options</div>
        </Card>
      </div>

      {/* Split Incentive Callout for food service */}
      {hasFoodService&&<Card style={{marginBottom:14,border:`1px solid ${C.warningBorder}`,background:C.warningLight,padding:14}}>
        <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
          <span style={{fontSize:16}}>🍳</span>
          <div>
            <div style={{fontSize:12,fontWeight:600,color:C.warning,marginBottom:3}}>Split Incentive Resolution — Food Service</div>
            <div style={{fontSize:11,color:C.text,lineHeight:1.6}}>
              Your building has food service tenants. <strong>Enbridge DCV Prescriptive</strong> + <strong>IESO Small Business DCKV</strong> can stack up to <strong style={{color:C.accent}}>$26,500</strong> for restaurant kitchen exhaust upgrades. The landlord receives the incentive even for tenant kitchens — this resolves the split incentive problem for kitchen ventilation.
            </div>
          </div>
        </div>
      </Card>}

      {/* Grouped Programs */}
      {grouped.map((section,si)=><div key={si} style={{marginBottom:16}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8,paddingBottom:6,borderBottom:`1px solid ${C.border}`}}>
          <div style={{width:4,height:14,borderRadius:2,background:section.color}}/>
          <span style={{fontSize:11,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",color:C.textMuted}}>{section.label}</span>
          <span style={{fontSize:10,fontWeight:500,color:C.textDim}}>({section.programs.length} program{section.programs.length>1?"s":""})</span>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {section.programs.map((inc,i)=>{const linkUrl=inc.url;return <Card key={i} style={{padding:14,opacity:inc.status==="pending"?0.7:1}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3,flexWrap:"wrap"}}>
                <span style={{fontSize:13,fontWeight:600}}>{inc.name}</span>
                <StatusBadge status={inc.status} type={inc.type}/>
                {inc.isAnnual&&<span style={{fontSize:9,fontWeight:600,padding:"2px 6px",borderRadius:4,background:"rgba(96,165,250,0.12)",color:C.blue}}>ANNUAL</span>}
                {inc.preApproval&&<span style={{fontSize:9,color:C.warning}}>⚠ PRE-APPROVAL</span>}
              </div>
              <div style={{fontSize:11,color:C.textMuted,marginBottom:2}}>{inc.org}{inc.timing?` · ${inc.timing}`:""}</div>
              <div style={{fontSize:11,color:C.text,lineHeight:1.5,marginTop:2}}>{inc.desc||""}</div>
              <div style={{fontSize:10,color:C.textMuted,marginTop:4,fontStyle:"italic"}}>{inc.stackNote}</div>
            </div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6,flexShrink:0,marginLeft:14}}>
              {inc.isFinancing?<span style={{fontSize:12,color:C.blue,fontWeight:500}}>Low-interest financing</span>
                :inc.amount?<span style={{fontSize:18,fontWeight:700,color:C.accent}}>{fmt$(inc.amount)}{inc.isAnnual?"/yr":""}</span>
                :<span style={{fontSize:12,color:C.textMuted}}>Varies</span>}
              {linkUrl?<a href={linkUrl.startsWith("http")?linkUrl:"https://"+linkUrl} target="_blank" rel="noopener noreferrer" style={{padding:"6px 14px",borderRadius:8,border:`1px solid ${C.accentBorder}`,background:"transparent",color:C.accent,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit",textDecoration:"none",whiteSpace:"nowrap"}}>{inc.action} →</a>
              :<button style={{padding:"6px 14px",borderRadius:8,border:`1px solid ${C.accentBorder}`,background:"transparent",color:C.accent,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>{inc.action} →</button>}
              {inc.contact&&<div style={{fontSize:9,color:C.textMuted,textAlign:"right",maxWidth:180}}>{inc.contact}</div>}
            </div>
          </div>
        </Card>;})}
        </div>
      </div>)}

      {/* Stacking Sequence Visualization */}
      <Card style={{marginTop:4,background:C.bgSoft}}>
        <SectionHead icon="↗" label="Stacking Sequence — Apply In This Order"/>
        <div style={{display:"flex",flexDirection:"column",gap:0}}>
          {stackSeq.map((inc,i)=>{
            const isLast=i===stackSeq.length-1;
            const isInstant=inc.stackOrder===1;
            const runningTotal=stackSeq.slice(0,i+1).reduce((s,x)=>s+(x.amount||0),0);
            return <div key={i} style={{display:"flex",gap:12,position:"relative"}}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:24}}>
                <div style={{width:22,height:22,borderRadius:99,background:isInstant?"#F1F5F9":C.accentLight,border:`2px solid ${isInstant?C.border:C.accent}`,
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:isInstant?C.textMuted:C.accent,flexShrink:0}}>
                  {i+1}
                </div>
                {!isLast&&<div style={{width:1,height:28,background:C.border}}/>}
              </div>
              <div style={{flex:1,paddingBottom:isLast?0:12}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:12,fontWeight:600,color:C.dark}}>{inc.name}</span>
                  {inc.amount&&<span style={{fontSize:11,fontWeight:600,color:C.accent}}>{fmt$(inc.amount)}{inc.isAnnual?"/yr":""}</span>}
                </div>
                <div style={{fontSize:10,color:C.textMuted,marginTop:1}}>
                  {inc.timing||""}{inc.timing?" · ":""}{isInstant?"Zero paperwork — instant at point of sale":inc.preApproval?"Submit BEFORE purchase order":""}
                </div>
                {!isLast&&<div style={{fontSize:9,color:C.accent,fontWeight:500,marginTop:2}}>Running total: {fmt$(runningTotal)}</div>}
                {isLast&&<div style={{fontSize:9,color:C.accent,fontWeight:600,marginTop:2}}>✓ Total stack: {fmt$(runningTotal)} ({Math.round((runningTotal/pathway.capitalCost)*100)}% of capital cost)</div>}
              </div>
            </div>;
          })}
        </div>
        <div style={{marginTop:12,padding:"8px 12px",borderRadius:6,background:C.bg,border:`1px solid ${C.border}`,fontSize:11,color:C.text,lineHeight:1.6}}>
          <strong>IESO + Enbridge</strong> always stack (different fuels — apply in parallel).
          {b.isCorporate&&<> <strong>CT ITC (30%)</strong> is refundable — CRA pays cash. Government grants reduce eligible cost first.</>}
          {" "}Financing ({financing.map(f=>f.name.split("—")[0].trim()).join(", ")||"CIB"}) covers remaining net cost after grants.
        </div>
      </Card>
    </div>;
    })()}

    {/* ═══ BUSINESS CASE ═══ */}
    {activeSection==="case"&&pathway.levers&&<div>
      {/* Summary Box */}
      <Card style={{background:`linear-gradient(135deg, ${C.accentLight}, #E6F5F0)`,marginBottom:16,border:`1px solid ${C.accentBorder}`}}>
        <SectionHead icon="✦" label="Bankability Framework — 20-Year Value"/>
        <div style={{fontSize:12,color:C.text,lineHeight:1.7,marginBottom:14}}>
          The business case for deep commercial retrofit cannot rest on utility bill savings alone. Scout identifies <strong style={{color:C.dark}}>{pathway.levers.levers.length} applicable financial levers</strong> that together produce a {pathway.levers.summary.conservativeRatio}× to {pathway.levers.summary.baseRatio}× return over 20 years.
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16}}>
          <div><div style={{fontSize:9,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",color:C.textMuted,marginBottom:3}}>Net Project Cost</div>
            <div style={{fontSize:22,fontWeight:700,color:C.dark}}>{fmt$(pathway.levers.summary.netProjectCost)}</div></div>
          <div><div style={{fontSize:9,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",color:C.textMuted,marginBottom:3}}>Conservative 20yr Value</div>
            <div style={{fontSize:22,fontWeight:700,color:C.accent}}>{fmt$(pathway.levers.summary.conservativeTotal)}</div>
            <div style={{fontSize:11,color:C.accent}}>{pathway.levers.summary.conservativeRatio}× return</div></div>
          <div><div style={{fontSize:9,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",color:C.textMuted,marginBottom:3}}>Base Case 20yr Value</div>
            <div style={{fontSize:22,fontWeight:700,color:C.accent}}>{fmt$(pathway.levers.summary.baseTotal)}</div>
            <div style={{fontSize:11,color:C.accent}}>{pathway.levers.summary.baseRatio}× return</div></div>
        </div>
      </Card>

      {/* Levers Grid */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {pathway.levers.levers.map((lever,i)=>{
          const isBankable=lever.bankable;
          const hasValue=(lever.annualValue||0)+(lever.assetValue||0)>0;
          return <Card key={i} style={{padding:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{fontSize:11,fontWeight:700,color:C.accent,minWidth:22}}>{lever.key}</span>
                <span style={{fontSize:12,fontWeight:600,color:C.dark}}>{lever.name}</span>
              </div>
              <span style={{fontSize:9,fontWeight:600,padding:"2px 7px",borderRadius:4,
                background:isBankable?"rgba(52,211,153,0.12)":"rgba(251,191,36,0.12)",
                color:isBankable?C.accent:C.warning}}>{isBankable?"BANKABLE":"EMERGING"}</span>
            </div>
            <div style={{fontSize:11,color:C.textMuted,marginBottom:4}}>{lever.type}</div>
            <div style={{fontSize:11,color:C.text,lineHeight:1.6}}>{lever.detail}</div>
            {hasValue&&<div style={{marginTop:8,display:"flex",gap:12}}>
              {lever.annualValue>0&&<div><span style={{fontSize:9,color:C.textMuted}}>Annual </span><span style={{fontSize:14,fontWeight:700,color:C.accent}}>{fmt$(lever.annualValue)}/yr</span></div>}
              {lever.assetValue>0&&<div><span style={{fontSize:9,color:C.textMuted}}>Asset Value </span><span style={{fontSize:14,fontWeight:700,color:C.dark}}>{fmt$(lever.assetValue)}</span></div>}
            </div>}
          </Card>;
        })}
      </div>

      {/* Common Mistake callout */}
      <Card style={{marginTop:14,background:C.bgSoft,borderLeft:`3px solid ${C.accent}`}}>
        <div style={{fontSize:12,color:C.text,lineHeight:1.7}}>
          <strong style={{color:C.dark}}>Why this matters:</strong> The common mistake is presenting only utility bill savings (currently thin at 2026 Ontario energy rates) while omitting asset value uplift, regulatory risk, lifecycle alignment, solar economics, and financing structure. Scout presents all {pathway.levers.levers.length} applicable levers — this is what converts a marginal energy payback into a {pathway.levers.summary.conservativeRatio}× investment case.
        </div>
      </Card>

      {/* Regulatory Risk Register */}
      <Card style={{marginTop:14}}>
        <SectionHead icon="⚖" label="Regulatory Risk Register"/>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {[
            {risk:"Toronto BEPS",status:"In development",impact:"Mandatory building performance standards. Non-compliance = retrofit premium of 20–35% for rushed compliance.",applicable:true,color:C.warning},
            {risk:"Vancouver Carbon Limits",status:"Mandatory from 2026",impact:"Precedent for Ontario adoption. Sets trajectory for commercial building emissions caps.",applicable:true,color:C.warning},
            {risk:"NECB 2020 Alterations Code",status:"Triggered on major renovation",impact:`Current envelope at R-${envelope?.current?.roof?.rValue||12} roof / R-${envelope?.current?.wall?.rValue||8} wall. Code requires R-${31}+ roof / R-${22}+ wall on alteration.`,applicable:envelope?.gaps?.length>0,color:C.red},
            {risk:"Federal Carbon Tax Escalation",status:`Currently $${CARBON.pricePerTonne}/tonne`,impact:`Building exposure: ${fmt$(carbon.annualExposure)}/yr at current rate. Scheduled to rise through 2030 — potentially 2-3× current levels.`,applicable:true,color:C.red},
            {risk:"Tenant ESG Requirements",status:"Accelerating",impact:"Major tenants increasingly require landlords to demonstrate building sustainability credentials. Affects lease competitiveness.",applicable:["office","retail","mixed-use"].includes(b.type),color:C.blue},
            {risk:"Stranded Asset Risk",status:"Material for assets held 5+ years",impact:"Buildings that cannot meet emerging standards face NAV impairment. Proactive retrofit protects against regulatory-driven devaluation.",applicable:b.ownershipType==="portfolio",color:C.warning},
          ].filter(r=>r.applicable).map((r,i)=><div key={i} style={{padding:"10px 14px",borderRadius:8,border:`1px solid ${r.color}22`,background:`${r.color}08`}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
              <span style={{fontSize:12,fontWeight:600,color:C.dark}}>{r.risk}</span>
              <span style={{fontSize:9,fontWeight:600,padding:"2px 6px",borderRadius:4,background:`${r.color}15`,color:r.color}}>{r.status}</span>
            </div>
            <div style={{fontSize:11,color:C.textMuted,lineHeight:1.5}}>{r.impact}</div>
          </div>)}
        </div>
      </Card>

      {/* Lender Readiness Checklist */}
      <Card style={{marginTop:14}}>
        <SectionHead icon="✓" label="Lender Readiness Checklist"/>
        <div style={{fontSize:11,color:C.textMuted,lineHeight:1.5,marginBottom:12}}>
          To secure CIB, BDC, or commercial retrofit financing, lenders typically require the following. Scout has pre-populated or can generate items marked with ✦.
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
          {[
            {item:"ASHRAE Level 2 Energy Audit",scout:false,status:pathway.id==="deep"?"Required for CIB":"Recommended"},
            {item:"12-Month Utility Bills",scout:true,status:baseline.costSource==="user-provided"?"✓ Provided":"Upload to improve accuracy"},
            {item:"3 Contractor Quotes",scout:false,status:"Use generated RFP package"},
            {item:"GHG Baseline Calculation",scout:true,status:`✓ ${carbon.totalEmissions} tCO₂e/yr calculated`},
            {item:"IESO/Enbridge Pre-Approval Letters",scout:true,status:"✓ Application drafts ready"},
            {item:"CT ITC Accountant Confirmation",scout:true,status:b.isCorporate?"Required — flag for accountant":"N/A (non-corporate)"},
            {item:"2-Year Audited Financial Statements",scout:false,status:"Required for CIB/BDC"},
            {item:"Building Condition Assessment",scout:false,status:"Optional — improves confidence +8%"},
            {item:"BOMA BEST Target Score",scout:true,status:"Achievable post-retrofit"},
            {item:"Post-Retrofit Appraisal Estimate",scout:true,status:`Est. ${fmt$(pathway.financials?.assetValueUplift||0)} uplift at ${((pathway.financials?.capRate||0.06)*100).toFixed(0)}% cap`},
            {item:"20-Year Cashflow Projection",scout:true,status:"✓ Generated in Business Case PDF"},
            {item:"Retrofit Scope & Specifications",scout:true,status:"✓ Engineering Scope Brief ready"},
          ].map((c,i)=><div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,padding:"7px 10px",borderRadius:6,background:C.bgSoft,border:`1px solid ${C.border}`}}>
            <div style={{width:16,height:16,borderRadius:4,flexShrink:0,marginTop:1,display:"flex",alignItems:"center",justifyContent:"center",
              background:c.scout?C.accentLight:"transparent",border:`1.5px solid ${c.scout?C.accent:C.border}`}}>
              {c.scout&&<span style={{fontSize:8,color:C.accent,fontWeight:700}}>✦</span>}
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:11,fontWeight:500,color:C.dark}}>{c.item}</div>
              <div style={{fontSize:10,color:c.status.startsWith("✓")?C.accent:C.textMuted}}>{c.status}</div>
            </div>
          </div>)}
        </div>
        <div style={{marginTop:10,padding:"8px 12px",borderRadius:6,background:C.accentLight,border:`1px solid ${C.accentBorder}`,fontSize:11,color:C.accent,lineHeight:1.5}}>
          <strong>✦ = Scout-generated.</strong> {[...new Set(["ASHRAE Level 2 Energy Audit","3 Contractor Quotes","2-Year Audited Financial Statements","Building Condition Assessment"].filter(x=>true))].length} items require external input. The rest are pre-populated or calculable from your building data.
        </div>
      </Card>
    </div>}

    {/* ═══ OUTPUTS ═══ */}
    {activeSection==="outputs"&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      {(outputDocs[activeTab]||[]).map((doc,i)=><Card key={i}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
          <div>
            <div style={{fontSize:13,fontWeight:600,marginBottom:3}}>{doc.name}</div>
            <span style={{fontSize:9,fontWeight:600,letterSpacing:"0.05em",padding:"2px 7px",borderRadius:4,background:C.cardInner,border:`1px solid ${C.border}`,color:C.textMuted}}>{doc.type}</span>
          </div>
          <button onClick={()=>{const html=generateDocument(doc.name,b,baseline,pathway,carbon,confidence);setDocPreview({title:doc.name,html,isJson:doc.name.includes("Handoff Export")});}}
            style={{padding:"5px 11px",borderRadius:6,border:`1px solid ${C.accentBorder}`,background:"transparent",color:C.accent,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
            View ↗
          </button>
        </div>
        <div style={{fontSize:11,color:C.textMuted,lineHeight:1.5,marginBottom:10}}>{doc.desc}</div>
        <div><div style={{fontSize:10,color:C.textMuted,marginBottom:3}}>Pre-populated</div><ProgressBar percent={doc.pct}/></div>
      </Card>)}
    </div>}

    {/* ═══ CONTACTS ═══ */}
    {activeSection==="contacts"&&<div>
      <div style={{fontSize:13,color:C.textMuted,marginBottom:14}}>Regional contacts for <strong style={{color:C.dark}}>{b.region}</strong> matched to your building and pathway.</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
        {pathwayContacts.map((c,i)=><Card key={i}>
          <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
            <div style={{width:40,height:40,borderRadius:10,background:`${c.color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:700,color:c.color,flexShrink:0}}>{c.initials}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13,fontWeight:600,marginBottom:1}}>{c.name}</div>
              <div style={{fontSize:11,color:C.textMuted,marginBottom:1}}>{c.title}</div>
              <div style={{fontSize:11,color:C.accent,marginBottom:5}}>{c.org} — {c.type}</div>
              <div style={{display:"flex",flexDirection:"column",gap:3}}>
                <a href={`mailto:${c.email}`} style={{fontSize:10,color:C.accent,wordBreak:"break-all",textDecoration:"none"}}>✉ {c.email}</a>
                <a href={`tel:${c.phone.replace(/[^\d+]/g,"")}`} style={{fontSize:10,color:C.textMuted,textDecoration:"none"}}>☎ {c.phone}</a>
              </div>
            </div>
          </div>
        </Card>)}
      </div>
      <Card style={{marginTop:12,background:C.bgSoft}}>
        <SectionHead icon="✉" label="Pre-Written Outreach"/>
        <div style={{fontSize:12,color:C.text,lineHeight:1.6,marginBottom:12}}>
          Scout has prepared personalized outreach emails for each contact, referencing your building address, selected pathway, and relevant program details. Each email is editable before sending.
        </div>
        <div style={{display:"flex",gap:8}}>
          {pathwayContacts.map((c,i)=><a key={i} href={buildMailto(c,b,pathway)} style={{flex:1,padding:"10px 14px",borderRadius:8,border:`1px solid ${C.border}`,
            background:C.bg,color:C.dark,fontSize:12,fontWeight:500,cursor:"pointer",textAlign:"left",fontFamily:"inherit",textDecoration:"none",display:"block"}}>
            <div style={{marginBottom:2}}>Email {c.name.split(" ")[0]}</div>
            <div style={{fontSize:11,color:C.textMuted}}>{c.org}</div>
          </a>)}
        </div>
      </Card>
    </div>}

    {/* ═══ NEXT STEPS ═══ */}
    {activeSection==="next"&&<div style={{maxWidth:660}}>
      {pathway.routing==="turnkey"?<><Card style={{border:`1px solid ${C.blueBorder}`,background:C.blueLight,marginBottom:14}}>
        <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",color:C.blue,marginBottom:6}}>Turnkey Partner Available</div>
        <div style={{fontSize:17,fontWeight:700,marginBottom:6}}>Efficiency Capital</div>
        <div style={{fontSize:12,color:C.text,lineHeight:1.6,marginBottom:14}}>For your building profile and retrofit scope, Efficiency Capital can manage the entire process — financing, engineering, procurement, construction, incentive applications, and 20-year performance management.</div>
        <div style={{display:"flex",gap:10}}>
          <a href={partners.turnkey?buildMailto(partners.turnkey,b,pathway):""} style={{padding:"9px 20px",borderRadius:8,border:"none",background:C.blue,color:"#fff",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit",textDecoration:"none"}}>Schedule Introduction Call</a>
          <a href={partners.turnkey?buildMailto(partners.turnkey,b,pathway):""} style={{padding:"9px 16px",borderRadius:8,border:`1px solid ${C.border}`,background:"transparent",color:C.textMuted,fontSize:12,cursor:"pointer",fontFamily:"inherit",textDecoration:"none"}}>Pre-written email ready →</a>
        </div>
      </Card>
      <div style={{fontSize:12,color:C.textMuted,lineHeight:1.7,marginBottom:14}}>
        You can also pursue individual programs directly. See the <span onClick={()=>setActiveSection("funding")} style={{color:C.accent,cursor:"pointer",textDecoration:"underline"}}>Funding & Incentives</span> tab for all eligible programs, or the <span onClick={()=>setActiveSection("contacts")} style={{color:C.accent,cursor:"pointer",textDecoration:"underline"}}>Partners & Contacts</span> tab for direct contact information.
      </div></>:<>
        <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.07em",textTransform:"uppercase",color:C.textMuted,marginBottom:14}}>Recommended Sequence</div>
        {[
          {action:pathway.incentives[0]?`Apply for ${pathway.incentives[0].name}`:"Review assessment",timing:"This week",detail:pathway.incentives[0]?.stackNote||""},
          {action:pathway.incentives[1]?`Apply for ${pathway.incentives[1].name}`:"Contact your LDC",timing:"Parallel",detail:pathway.incentives[1]?.stackNote||""},
          {action:"Issue contractor RFP or engage engineering",timing:"After approvals",detail:"Use generated RFP/scope package"},
        ].map((step,i)=><div key={i} style={{display:"flex",gap:14,paddingBottom:20}}>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:20}}>
            <div style={{width:10,height:10,borderRadius:99,background:C.accent,flexShrink:0,marginTop:4,border:`3px solid ${C.bg}`,boxSizing:"content-box"}}/>
            {i<2&&<div style={{width:1,flex:1,background:C.border,marginTop:4}}/>}
          </div>
          <Card style={{flex:1,padding:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
              <span style={{fontSize:13,fontWeight:600}}>{step.action}</span>
              <span style={{fontSize:11,color:C.accent,fontWeight:500}}>{step.timing}</span>
            </div>
            <div style={{fontSize:11,color:C.textMuted}}>{step.detail}</div>
          </Card>
        </div>)}
      </>}
      <Card style={{marginTop:12}}>
        <SectionHead icon="⏱" label="Capital Timing Triggers"/>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {triggers.filter(t=>t.status!=="info").map((t,i)=>{
            const col=t.status==="critical"?C.red:C.warning;const bg=t.status==="critical"?C.redLight:C.warningLight;
            return <div key={i} style={{padding:"9px 12px",borderRadius:8,background:bg,border:`1px solid ${col}22`}}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                <span style={{fontSize:12,fontWeight:600,color:col}}>{t.name}</span>
                <span style={{fontSize:9,fontWeight:700,padding:"1px 5px",borderRadius:4,background:`${col}12`,color:col}}>{t.status==="critical"?"URGENT":"ATTENTION"}</span>
              </div>
              <div style={{fontSize:11,color:C.textMuted}}>{t.medianLife}-year median life. Est. age: {t.estimatedAge} yrs. {t.remaining<=0?"Past expected lifecycle.":`~${t.remaining} years remaining.`}</div>
            </div>;
          })}
        </div>
        {b.buildingAge&&b.buildingAge>=40&&<div style={{marginTop:8,padding:"8px 12px",borderRadius:6,background:C.bgSoft,fontSize:11,color:C.textMuted,lineHeight:1.5}}>
          <strong style={{color:C.text}}>Building age: {b.buildingAge} years.</strong> Most commercial buildings enter a "midlife crisis" around year 40. Your building is {b.buildingAge-40}+ years past this threshold.
        </div>}
      </Card>
    </div>}

    {/* Not ready hook */}
    <Card style={{marginTop:20,background:C.bgSoft,border:`1px solid ${C.border}`}}>
      <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
        <div style={{width:32,height:32,borderRadius:10,background:C.accentLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0}}>🔖</div>
        <div style={{flex:1}}>
          <div style={{fontSize:13,fontWeight:600,marginBottom:3}}>Not ready yet?</div>
          <div style={{fontSize:12,color:C.textMuted,lineHeight:1.5,marginBottom:10}}>No problem. Scout can watch for changes and alert you when timing improves:</div>
          <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:14}}>
            {[
              {label:"Alert me when DRAI Cohort 6 opens",desc:"Next intake expected Q4 2026"},
              {label:"Alert me if carbon pricing changes",desc:`Currently $${CARBON.pricePerTonne}/tonne — federal escalation scheduled`},
              {label:"Recalculate if energy rates shift >10%",desc:`Monitors ${b.ldc} and ${b.gasUtility} rate schedules`},
              {label:"Remind me in 6 months",desc:"Re-run assessment with updated data"},
            ].map((item,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 12px",borderRadius:8,background:C.bg,border:`1px solid ${C.border}`,cursor:"pointer"}}>
              <div style={{width:18,height:18,borderRadius:4,border:`2px solid ${C.border}`,flexShrink:0}}/>
              <div style={{flex:1}}>
                <div style={{fontSize:12,fontWeight:500,color:C.dark}}>{item.label}</div>
                <div style={{fontSize:11,color:C.textMuted}}>{item.desc}</div>
              </div>
            </div>)}
          </div>
          <div style={{display:"flex",gap:8}}>
            <button style={{padding:"7px 14px",borderRadius:8,border:"none",background:C.accent,color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Save & Set Alerts</button>
            <button style={{padding:"7px 14px",borderRadius:8,border:`1px solid ${C.border}`,background:"transparent",color:C.textMuted,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>Email me this assessment</button>
          </div>
        </div>
      </div>
    </Card>

    </div>{/* end content area */}

    <div style={{marginTop:0,paddingTop:16,paddingBottom:20,borderTop:`1px solid ${C.border}`,textAlign:"center"}}>
      <span style={{fontSize:10,letterSpacing:"0.08em",textTransform:"uppercase",color:C.textDim}}>Scout · Gambit Technologies · Funded by NRCan DRAI</span>
    </div>
  </div>{/* end maxWidth content */}

  {/* ═══ SCOUT SIDEBAR CHAT ═══ */}
  <div style={{position:"fixed",top:0,right:0,width:380,height:"100vh",zIndex:100,
    background:D.bg,borderLeft:`1px solid ${D.border}`,boxShadow:chatOpen?"-8px 0 30px rgba(0,0,0,0.2)":"none",
    transform:chatOpen?"translateX(0)":"translateX(100%)",transition:"transform 0.3s ease, box-shadow 0.3s ease",
    display:"flex",flexDirection:"column",fontFamily:"'DM Sans','Helvetica Neue',sans-serif"}}>
    {/* Sidebar header */}
    <div style={{padding:"14px 18px",borderBottom:`1px solid ${D.border}`,display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
      <img src={SCOUT_IMG_SM} alt="Scout" style={{width:30,height:30,borderRadius:8,objectFit:"cover"}}/>
      <div style={{flex:1}}>
        <div style={{fontSize:13,fontWeight:700,color:D.white,lineHeight:1.2}}>Scout</div>
        <div style={{fontSize:9,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",color:D.accent}}>Ask me anything</div>
      </div>
      <button onClick={()=>setChatOpen(false)} style={{width:28,height:28,borderRadius:7,border:`1px solid ${D.border}`,background:"transparent",color:D.textDim,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
    </div>
    {/* Messages */}
    <div ref={chatScrollRef} style={{flex:1,overflowY:"auto",padding:"16px 14px",display:"flex",flexDirection:"column",gap:10}}>
      {chatMsgs.length===0&&<div style={{textAlign:"center",padding:"40px 16px"}}>
        <img src={SCOUT_IMG_SM} alt="Scout" style={{width:48,height:48,borderRadius:14,objectFit:"cover",marginBottom:12,opacity:0.7}}/>
        <div style={{fontSize:13,fontWeight:600,color:D.textMuted,marginBottom:8}}>Ask Scout anything</div>
        <div style={{fontSize:12,color:D.textDim,lineHeight:1.6,marginBottom:16}}>I can see your full assessment. Ask me about pathways, incentives, next steps, or anything else.</div>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {["Compare pathways for me","Explain my incentive options","Help me draft an email to my LDC","What happens if I wait 2 years?"].map((q,i)=>
            <button key={i} onClick={()=>sendChat(q)}
              style={{padding:"8px 12px",borderRadius:8,border:`1px solid ${D.border}`,background:D.card,color:D.text,fontSize:12,textAlign:"left",cursor:"pointer",fontFamily:"inherit",transition:"border-color 0.15s"}}
              onMouseEnter={e=>e.currentTarget.style.borderColor=D.accent}
              onMouseLeave={e=>e.currentTarget.style.borderColor=D.border}>
              {q}
            </button>)}
        </div>
      </div>}
      {chatMsgs.map((m,i)=>m.isScout?
        <div key={i} style={{display:"flex",gap:8,alignItems:"flex-start",animation:"fadeIn 0.3s"}}>
          <img src={SCOUT_IMG_SM} alt="Scout" style={{width:26,height:26,borderRadius:7,objectFit:"cover",flexShrink:0,marginTop:2}}/>
          <div style={{flex:1,padding:"10px 14px",background:D.card,border:`1px solid ${D.border}`,borderRadius:"2px 12px 12px 12px",fontSize:13,color:D.text,lineHeight:1.65,whiteSpace:"pre-wrap"}}>{m.text}</div>
        </div>
        :<div key={i} style={{display:"flex",justifyContent:"flex-end",animation:"fadeIn 0.2s"}}>
          <div style={{maxWidth:"85%",padding:"10px 14px",background:D.accentDim,border:`1px solid ${D.accentBorder}`,borderRadius:"12px 2px 12px 12px",fontSize:13,color:D.white,lineHeight:1.6,whiteSpace:"pre-wrap"}}>{m.text}</div>
        </div>
      )}
      {chatLoading&&<div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
        <img src={SCOUT_IMG_SM} alt="Scout" style={{width:26,height:26,borderRadius:7,objectFit:"cover",flexShrink:0}}/>
        <div style={{padding:"10px 14px",background:D.card,border:`1px solid ${D.border}`,borderRadius:"2px 12px 12px 12px"}}>
          <div style={{display:"flex",gap:3}}>{Array.from({length:8}).map((_,i)=><div key={i} style={{width:3,borderRadius:2,background:D.accent,opacity:0.3,animation:`waveBar 0.8s ease-in-out ${i*0.08}s infinite alternate`}}/>)}</div>
        </div>
      </div>}
    </div>
    {/* Input */}
    <div style={{padding:"10px 14px",borderTop:`1px solid ${D.border}`,flexShrink:0}}>
      <div style={{display:"flex",gap:8,alignItems:"flex-end",background:D.bgAlt,border:`1px solid ${D.border}`,borderRadius:12,padding:"4px 4px 4px 14px"}}>
        <textarea ref={chatInputRef} value={chatInput} onChange={e=>setChatInput(e.target.value)}
          onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendChat();}}}
          placeholder="Ask Scout..." rows={1}
          style={{flex:1,resize:"none",border:"none",background:"transparent",color:D.white,fontSize:13,fontFamily:"inherit",outline:"none",padding:"8px 0",lineHeight:1.4,maxHeight:80,overflowY:"auto"}}/>
        <button onClick={sendChat} disabled={!chatInput.trim()||chatLoading}
          style={{width:32,height:32,borderRadius:8,border:"none",background:chatInput.trim()?D.accent:"transparent",color:chatInput.trim()?"#fff":D.textDim,
            fontSize:14,cursor:chatInput.trim()?"pointer":"default",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s"}}>↑</button>
      </div>
    </div>
  </div>

  {/* ═══ FLOATING SCOUT BUTTON ═══ */}
  {!chatOpen&&<button onClick={()=>setChatOpen(true)}
    style={{position:"fixed",bottom:24,right:24,zIndex:90,height:48,borderRadius:14,border:"none",
      background:`linear-gradient(135deg, ${C.accent}, #059669)`,cursor:"pointer",
      boxShadow:"0 4px 20px rgba(16,185,129,0.35)",transition:"transform 0.2s, box-shadow 0.2s",
      display:"flex",alignItems:"center",gap:10,overflow:"hidden",padding:"0 16px 0 6px"}}
    onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.04)";e.currentTarget.style.boxShadow="0 6px 28px rgba(16,185,129,0.45)";}}
    onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 4px 20px rgba(16,185,129,0.35)";}}>
    <img src={SCOUT_IMG_SM} alt="Scout" style={{width:36,height:36,borderRadius:10,objectFit:"cover"}}/>
    <span style={{fontSize:13,fontWeight:600,color:"#fff",whiteSpace:"nowrap",fontFamily:"'DM Sans',sans-serif"}}>Ask Scout anything</span>
  </button>}

  </div>;
}


// ═══════════════════════════════════════════════════════════════════
// MAIN APP — WIRES ALL 4 PAGES
// ═══════════════════════════════════════════════════════════════════

export default function ScoutFullFlow(){
  const [view,setView]=useState("address"); // address | intake | chat | loading | dashboard
  const [addressData,setAddressData]=useState(null);
  const [intakeData,setIntakeData]=useState(null);
  const [assessment,setAssessment]=useState(null);
  const [docPreview,setDocPreview]=useState(null); // {title, html, isJson}

  const handleAddressConfirm=(addr)=>{setAddressData(addr);setView("intake");};

  const handleIntakeSubmit=(data)=>{setIntakeData(data);setView("chat");};

  const handleResults=()=>{
    setView("loading");
    setTimeout(()=>{
      try{
        const result=buildEngine(intakeData.engineInputs);
        setAssessment(result);
        setView("dashboard");
      }catch(e){
        console.error("Engine error:",e);
        // Fallback — still show dashboard with whatever we can build
        try{
          // Ensure critical fields have defaults
          const safeInputs={...intakeData.engineInputs};
          if(!safeInputs.yearBuilt)safeInputs.yearBuilt=1985;
          if(!safeInputs.sqft&&!safeInputs.units)safeInputs.sqft=20000;
          if(!safeInputs.buildingType)safeInputs.buildingType="office";
          if(!safeInputs.ownershipType)safeInputs.ownershipType="portfolio";
          const result=buildEngine(safeInputs);
          setAssessment(result);
          setView("dashboard");
        }catch(e2){
          console.error("Engine fallback also failed:",e2);
          setView("chat");
        }
      }
    },1200);
  };

  const stepLabels={address:"Find Your Building",intake:"Building Profile",chat:"Talk to Scout",loading:"Processing...",dashboard:"Retrofit Roadmap"};
  const stepNum={address:1,intake:2,chat:3,loading:3,dashboard:4};
  const isChat=view==="chat";

  return <div style={{minHeight:"100vh",background:isChat?D.bg:C.bgSoft,color:isChat?D.white:C.dark,fontFamily:"'DM Sans','Helvetica Neue',sans-serif",display:"flex",flexDirection:"column"}}>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"/>

    {/* Top bar (hidden during chat — chat has its own) */}
    {!isChat&&<div style={{padding:"11px 28px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:`1px solid ${C.border}`,background:C.bg,position:"sticky",top:0,zIndex:50}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <img src={SCOUT_IMG_SM} alt="Scout" style={{width:26,height:26,borderRadius:7,objectFit:"cover"}}/>
        <span style={{fontWeight:600,fontSize:15}}>Scout</span>
        <span style={{fontSize:12,color:C.textMuted,marginLeft:4}}>{stepLabels[view]}</span>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{display:"flex",gap:3}}>
            {[1,2,3,4].map(s=><div key={s} style={{width:s===stepNum[view]?20:6,height:3,borderRadius:2,
              background:s<=stepNum[view]?C.accent:C.border,opacity:s===stepNum[view]?1:0.5,transition:"all 0.3s"}}/>)}
          </div>
          <span style={{fontSize:11,color:C.textMuted}}>Step {stepNum[view]} of 4</span>
        </div>
        {view==="dashboard"&&assessment&&<div style={{display:"flex",gap:8}}>
          <button onClick={()=>{const html=generateFullExportHtml(assessment);setDocPreview({title:"Scout Full Assessment Report",html,isJson:false});}} style={{padding:"6px 14px",borderRadius:8,border:`1px solid ${C.border}`,background:"transparent",color:C.text,fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:"inherit"}}>↓ Export Full Report</button>
        </div>}
      </div>
    </div>}

    {/* Loading state */}
    {view==="loading"&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",flex:1,gap:16}}>
      <img src={SCOUT_IMG_SM} alt="Scout" style={{width:48,height:48,borderRadius:14,objectFit:"cover",animation:"pulse 1.2s ease infinite"}}/>
      <div style={{fontSize:15,fontWeight:600}}>Running assessment engine...</div>
      <div style={{fontSize:12,color:C.textMuted}}>Energy baseline · Capital triggers · Pathway matching · Incentive eligibility · Partner routing</div>
    </div>}

    {view==="address"&&<AddressPage onConfirm={handleAddressConfirm}/>}
    {view==="intake"&&<IntakeForm onSubmit={handleIntakeSubmit} addressData={addressData}/>}
    {view==="chat"&&intakeData&&<ChatPage formData={intakeData.chatFormData} onResults={handleResults}/>}
    {view==="dashboard"&&assessment&&<Dashboard assessment={assessment} onBack={()=>setView("intake")} setDocPreview={setDocPreview}/>}

    {/* ═══ DOCUMENT PREVIEW OVERLAY ═══ */}
    {docPreview&&<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:9999,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setDocPreview(null)}>
      <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:850,maxHeight:"90vh",background:"#fff",borderRadius:16,overflow:"hidden",display:"flex",flexDirection:"column",boxShadow:"0 25px 50px rgba(0,0,0,0.25)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 20px",borderBottom:"1px solid #e2e8f0",flexShrink:0}}>
          <div style={{fontWeight:600,fontSize:15,color:"#1a1a1a"}}>{docPreview.title}</div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>{try{navigator.clipboard.writeText(docPreview.isJson?docPreview.html:docPreview.html.replace(/<[^>]*>/g,""))}catch(e){}}} style={{padding:"6px 14px",borderRadius:6,border:"1px solid #e2e8f0",background:"#fff",color:"#334155",fontSize:12,fontWeight:500,cursor:"pointer",fontFamily:"inherit"}}>Copy Text</button>
            <button onClick={()=>setDocPreview(null)} style={{padding:"6px 14px",borderRadius:6,border:"none",background:"#f1f5f9",color:"#64748b",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>✕ Close</button>
          </div>
        </div>
        <div style={{flex:1,overflow:"auto",padding:"24px 32px",fontFamily:"'Helvetica Neue',Arial,sans-serif",fontSize:14,color:"#1a1a1a",lineHeight:1.6}}>
          {docPreview.isJson?<pre style={{fontSize:12,fontFamily:"'SF Mono','Fira Code',monospace",background:"#f8fafb",padding:20,borderRadius:8,overflow:"auto",whiteSpace:"pre-wrap",wordBreak:"break-word"}}>{docPreview.html}</pre>
          :<div dangerouslySetInnerHTML={{__html:docPreview.html}}/>}
        </div>
      </div>
    </div>}

    {/* Footer (not on chat or dashboard) */}
    {!isChat&&view!=="dashboard"&&view!=="loading"&&<div style={{padding:"16px 32px",borderTop:`1px solid ${C.border}`,textAlign:"center",background:C.bg}}>
      <span style={{fontSize:10,letterSpacing:"0.08em",textTransform:"uppercase",color:C.textDim}}>Scout · Gambit Technologies · Funded by NRCan DRAI</span>
    </div>}

    <style>{`
      @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
      @keyframes pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.08);opacity:0.8}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
      @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
      @keyframes waveBar{0%{height:4px;opacity:0.25}100%{height:16px;opacity:0.7}}
      @keyframes orbitPulse{0%,100%{transform:scale(0.6);opacity:0.4}50%{transform:scale(1.1);opacity:1}}
      input::placeholder{color:${C.textDim};}
      textarea::placeholder{color:${D.textDim};}
      button:hover{opacity:0.92;}
      *{box-sizing:border-box;}
      div::-webkit-scrollbar{width:5px;}
      div::-webkit-scrollbar-track{background:transparent;}
      div::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.06);border-radius:3px;}
    `}</style>
  </div>;
}
