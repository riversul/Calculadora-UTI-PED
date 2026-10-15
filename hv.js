/* =====================================================
   HIDRATAÇÃO VENOSA (HV) PEDIÁTRICA
   Usa elemento(), obterNumero() e formatarNumero() de script.js
   ===================================================== */


/* =====================================================
   CONCENTRAÇÕES DAS SOLUÇÕES
   ===================================================== */

const HV_NACL_20_MEQ_ML = 3.4;
const HV_KCL_191_MEQ_ML = 2.5;
const HV_GLUC_CA_10_MEQ_ML = 0.46;
const HV_SG50_MG_ML = 500;
const HV_HS_MAXIMO_ML = 2400;


/* =====================================================
   ABA HV
   ===================================================== */

const tabHV = elemento("tabHV");
const paginaHV = elemento("paginaHV");

const hvOutrasAbas = [
    { tab: elemento("tabCalculadora"), pagina: elemento("paginaCalculadora") },
    { tab: elemento("tabLeitos"), pagina: elemento("paginaLeitos") },
    { tab: elemento("tabSinaisVitais"), pagina: elemento("paginaSinaisVitais") }
];

if (tabHV && paginaHV) {

    tabHV.addEventListener(
        "click",
        function() {

            tabHV.classList.add("active");
            paginaHV.classList.remove("hidden");

            hvOutrasAbas.forEach(function(aba) {
                if (aba.tab) aba.tab.classList.remove("active");
                if (aba.pagina) aba.pagina.classList.add("hidden");
            });

            // Aproveita o peso digitado na calculadora
            const pesoCalculadora = elemento("peso");

            if (
                pesoCalculadora &&
                pesoCalculadora.value &&
                !elemento("hvPeso").value
            ) {
                elemento("hvPeso").value = pesoCalculadora.value;
            }

        }
    );

    hvOutrasAbas.forEach(function(aba) {

        if (!aba.tab) return;

        aba.tab.addEventListener(
            "click",
            function() {
                tabHV.classList.remove("active");
                paginaHV.classList.add("hidden");
            }
        );

    });

}


/* =====================================================
   MODO DO VOLUME
   ===================================================== */

const hvModoVolume = elemento("hvModoVolume");

if (hvModoVolume) {

    hvModoVolume.addEventListener(
        "change",
        function() {

            const manual = this.value === "mlkg";

            elemento("hvCampoPercentual").classList.toggle("hidden", manual);
            elemento("hvCampoMlKg").classList.toggle("hidden", !manual);

        }
    );

}


/* =====================================================
   HOLLIDAY-SEGAR
   ===================================================== */

function hollidaySegar(peso) {

    let volume;

    if (peso <= 10) {
        volume = 100 * peso;
    } else if (peso <= 20) {
        volume = 1000 + 50 * (peso - 10);
    } else {
        volume = 1500 + 20 * (peso - 20);
    }

    return Math.min(volume, HV_HS_MAXIMO_ML);

}


/* =====================================================
   ELETRÓLITO -> mEq/dia
   ===================================================== */

function hvMeqDia(valor, unidade, peso, volumeTotal) {

    if (unidade === "kg") {
        return valor * peso;
    }

    return valor * volumeTotal / 1000;

}


/* =====================================================
   ERRO
   ===================================================== */

function hvMostrarErro(texto) {

    elemento("hvMensagemErro").textContent = texto;
    elemento("hvErro").classList.remove("hidden");
    elemento("hvResultado").classList.add("hidden");

}


/* =====================================================
   CALCULAR HV
   ===================================================== */

const hvCalcular = elemento("hvCalcular");

if (hvCalcular) {

    hvCalcular.addEventListener(
        "click",
        function() {

            elemento("hvErro").classList.add("hidden");
            elemento("hvResultado").classList.add("hidden");

            const peso = obterNumero(elemento("hvPeso").value);
            const modo = elemento("hvModoVolume").value;
            const vig = obterNumero(elemento("hvVIG").value);
            const concBase = obterNumero(elemento("hvSoroBase").value);
            const mgMlBase = concBase * 10;
            const etapas = obterNumero(elemento("hvEtapas").value);

            const naValor = obterNumero(elemento("hvNa").value || "0");
            const kValor = obterNumero(elemento("hvK").value || "0");
            const caMlKg = obterNumero(elemento("hvCa").value || "0");

            if (!Number.isFinite(peso) || peso <= 0) {
                hvMostrarErro("Informe um peso válido.");
                return;
            }

            if (!Number.isFinite(vig) || vig < 0) {
                hvMostrarErro("Informe uma VIG válida.");
                return;
            }

            if (
                !Number.isFinite(naValor) || naValor < 0 ||
                !Number.isFinite(kValor) || kValor < 0 ||
                !Number.isFinite(caMlKg) || caMlKg < 0
            ) {
                hvMostrarErro("Confira os valores de eletrólitos.");
                return;
            }


            /* ---------- Volume total ---------- */

            let volumeTotal;

            if (modo === "mlkg") {

                const mlKg = obterNumero(elemento("hvMlKg").value);

                if (!Number.isFinite(mlKg) || mlKg <= 0) {
                    hvMostrarErro("Informe o volume em mL/kg/dia.");
                    return;
                }

                volumeTotal = mlKg * peso;

            } else {

                const percentual = obterNumero(elemento("hvPercentual").value);

                if (!Number.isFinite(percentual) || percentual <= 0) {
                    hvMostrarErro("Informe o percentual do Holliday-Segar.");
                    return;
                }

                volumeTotal = hollidaySegar(peso) * percentual / 100;

            }


            /* ---------- Eletrólitos ---------- */

            const naMeq = hvMeqDia(naValor, elemento("hvNaUnidade").value, peso, volumeTotal);
            const kMeq = hvMeqDia(kValor, elemento("hvKUnidade").value, peso, volumeTotal);

            const volNaCl = naMeq / HV_NACL_20_MEQ_ML;
            const volKCl = kMeq / HV_KCL_191_MEQ_ML;
            const volCa = caMlKg * peso;

            const volumeRestante = volumeTotal - volNaCl - volKCl - volCa;

            if (volumeRestante <= 0) {
                hvMostrarErro(
                    "O volume dos eletrólitos ultrapassa o volume total. Reduza Na/K/Ca ou aumente o volume."
                );
                return;
            }


            /* ---------- Glicose ----------
               base (x) + SG 50% (y) = volumeRestante
               mgMlBase·x + 500·y = glicose
            */

            const glicoseMg = vig * peso * 1440;

            let volBase;
            let volSG50;
            let volAD = 0;

            volSG50 = (glicoseMg - mgMlBase * volumeRestante) / (HV_SG50_MG_ML - mgMlBase);

            if (volSG50 < 0) {

                // Glicose menor do que o soro de base puro: completa com água destilada
                volSG50 = 0;
                volBase = glicoseMg / mgMlBase;
                volAD = volumeRestante - volBase;

            } else {

                volBase = volumeRestante - volSG50;

            }

            if (volBase < 0) {
                hvMostrarErro(
                    "VIG alta demais para este volume: a glicose necessária excede SG 50% puro. Reduza a VIG ou aumente o volume."
                );
                return;
            }


            /* ---------- Resultados ---------- */

            const concGlicose = glicoseMg / volumeTotal / 10;
            const naL = naMeq / volumeTotal * 1000;
            const kL = kMeq / volumeTotal * 1000;
            const caMeq = volCa * HV_GLUC_CA_10_MEQ_ML;

            const osm =
                (glicoseMg / 180) / volumeTotal * 1000 +
                2 * (naL + kL) +
                caMeq / volumeTotal * 1000 * 1.5;

            elemento("hvVazao").textContent =
                formatarNumero(arredondar(volumeTotal / 24, 1)) + " mL/h";

            elemento("hvVolumeTotal").textContent =
                formatarNumero(arredondar(volumeTotal, 0)) + " mL/dia";

            elemento("hvConcGlicose").textContent =
                formatarNumero(arredondar(concGlicose, 1)) + "%";

            elemento("hvNaFinal").textContent =
                formatarNumero(arredondar(naL, 0)) + " mEq/L · " +
                formatarNumero(arredondar(naMeq / peso, 1)) + " mEq/kg/dia";

            elemento("hvKFinal").textContent =
                formatarNumero(arredondar(kL, 0)) + " mEq/L · " +
                formatarNumero(arredondar(kMeq / peso, 1)) + " mEq/kg/dia";

            elemento("hvVIGFinal").textContent =
                formatarNumero(vig) + " mg/kg/min";

            elemento("hvOsm").textContent =
                formatarNumero(arredondar(osm, 0)) + " mOsm/L";


            /* ---------- Tabela ---------- */

            const linhas = [
                ["SG " + concBase + "%", volBase],
                ["SG 50%", volSG50],
                ["Água destilada", volAD],
                ["NaCl 20%", volNaCl],
                ["KCl 19,1%", volKCl],
                ["Gluconato de Ca 10%", volCa]
            ];

            const tabela = elemento("hvTabela");
            tabela.innerHTML = "";

            linhas.forEach(function(linha) {

                if (linha[1] <= 0.0001) return;

                const tr = document.createElement("tr");

                [
                    linha[0],
                    formatarNumero(arredondar(linha[1], 1)) + " mL",
                    formatarNumero(arredondar(linha[1] / etapas, 1)) + " mL"
                ].forEach(function(texto) {
                    const td = document.createElement("td");
                    td.textContent = texto;
                    tr.appendChild(td);
                });

                tabela.appendChild(tr);

            });

            const total = document.createElement("tr");
            total.innerHTML =
                "<td><strong>Total</strong></td>" +
                "<td><strong>" + formatarNumero(arredondar(volumeTotal, 1)) + " mL</strong></td>" +
                "<td><strong>" + formatarNumero(arredondar(volumeTotal / etapas, 1)) + " mL</strong></td>";
            tabela.appendChild(total);

            elemento("hvColunaEtapa").textContent =
                etapas === 1 ? "Por etapa" : "Por etapa (" + (24 / etapas) + " h)";


            /* ---------- Alertas ---------- */

            const alertas = [];

            if (concGlicose > 12.5) {
                alertas.push("Glicose > 12,5%: preferir acesso venoso central.");
            }

            if (kL > 40) {
                alertas.push("K > 40 mEq/L: atenção em acesso periférico e monitorização.");
            }

            if (naL < 130) {
                alertas.push("Solução hipotônica (Na < 130 mEq/L): risco de hiponatremia.");
            }

            if (osm > 900) {
                alertas.push("Osmolaridade > 900 mOsm/L: preferir acesso venoso central.");
            }

            if (modo === "hs" && hollidaySegar(peso) === HV_HS_MAXIMO_ML) {
                alertas.push("Holliday-Segar limitado ao máximo de 2.400 mL/dia.");
            }

            const caixaAlertas = elemento("hvAlertas");
            caixaAlertas.innerHTML = "";

            alertas.forEach(function(texto) {
                const p = document.createElement("p");
                p.textContent = "⚠️ " + texto;
                caixaAlertas.appendChild(p);
            });

            caixaAlertas.classList.toggle("hidden", alertas.length === 0);

            elemento("hvResultado").classList.remove("hidden");

        }
    );

}


function arredondar(valor, casas) {

    const fator = Math.pow(10, casas);
    return Math.round(valor * fator) / fator;

}
