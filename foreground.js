const currentUrl = window.location.href;
const isSingle = currentUrl.startsWith("https://www.njuskalo.hr/nekretnine");

if (isSingle) {
  startSingle();
} else {
  startList();
}

function startSingle() {
  const priceElement = document.querySelector(".ClassifiedDetailSummary-priceDomestic");
  const areaElement = document.querySelector(".ClassifiedDetailHighlightedAttributes-text");
  let price = 0,
    area = 0;

  if (areaElement) {
    const areaText = areaElement.textContent.trim();
    const match = areaText.match(/(\d+([,\.]\d+)?)\s*m²/);

    if (match) {
      const areaNumber = match[1];
      const areaFloat = parseFloat(areaNumber.replace(",", "."));
      area = areaFloat;
    }
  }

  if (priceElement) {
    const priceText = priceElement.textContent.trim();
    const priceMatch = priceText.replace(/[^\d]/g, "");
    const priceNumber = parseInt(priceMatch, 10);
    price = priceNumber;
  }

  if (price > 1 && area > 1) {
    const pricePerSqmt = formarPrice(price / area);
    priceElement.textContent += `, ${pricePerSqmt} €/m²`;
  }
}

function startList() {
  const targets = document.querySelectorAll(".EntityList-items article:has(.entity-prices)");

  targets.forEach((element) => {
    const priceElement = element.querySelector(".price");
    const areaElement = element.querySelector(".entity-description .entity-description-main");
    let price = 0,
      area = 0;

    if (priceElement) {
      let priceText = priceElement.textContent.trim();
      priceText = priceText.replace(/[^\d.]/g, "");
      price = parseInt(priceText.replace(/\./g, ""), 10);
    }

    if (areaElement) {
      const text = areaElement.innerText;
      const match = text.match(/Stambena površina:\s*(\d+)/);

      if (match) {
        const surfaceArea = parseInt(match[1], 10);
        area = surfaceArea;
      }
    }

    if (price > 1 && area > 1) {
      const pricePerAreaUnit = price / area;
      const pricePerAreaUnitFormatted = formarPrice(pricePerAreaUnit);
      const pricePerAreaUnitText = pricePerAreaUnitFormatted + " €/m²";

      const listItem = document.createElement("li");
      listItem.classList.add("price-item");

      const priceStrong = document.createElement("strong");
      priceStrong.classList.add("price", "price--hrk");
      priceStrong.textContent = pricePerAreaUnitText;

      listItem.appendChild(priceStrong);

      element.querySelector(".entity-prices ul").appendChild(listItem);
    }
  });
}

function formarPrice(num) {
  return new Intl.NumberFormat("hr-HR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}
