const list = [
  "tess",
  "veltec",
  "termtech",
  "litlas 8",
  "falck",
  "gac",
  "litlas 20",
  "56",
  "cameron",
  "well c",
  "hydro scand",
  "mtt",
  "tess psw",
  "psw",
  "212",
  "210",
  "kca",
  "171",
  "grieg",
  "seljelid",
  "modex",
  "c",
  "a",
  "b",
  "sar",
  "w",
  "swire",
  "aa",
  "j",
];

const ordered = [];

list.forEach((item, i) => (ordered[item] = i));

export const sortStops = (list) => {
  const sortedList = list.map((item) => item.toLowerCase());
  sortedList.sort((a, b) => {
    const indexA = ordered[a];
    const indexB = ordered[b];

    return indexA - indexB;
  });
  return sortedList.map((item) => item.toUpperCase());
};

export const decoder = (item) => {
  const itemSplit = item.split("/");
  const stopName = !!itemSplit[0] && itemSplit[0];
  const flags = !!itemSplit[1] ? itemSplit[1].split("") : [];
  const note = !!itemSplit[2] ? itemSplit[2] : "";

  const flagsFinal = {};
  if (flags.includes("B") || (flags.includes("P") && flags.includes("B"))) {
    flagsFinal.both = true;
  } else if (flags.includes("H")) {
    flagsFinal.pickup = true;
  }

  if (flags.includes("P")) flagsFinal.pallet = true;

  return {
    stopName,
    markers: flagsFinal,
    note,
    noFlagsEntered: flags.length === 0 || false,
  };
};

export class Time {
  now = new Date();

  constructor(hours, minutes) {
    hours && this.now.setHours(hours);
    minutes && this.now.setMinutes(minutes);
  }

  get hour12() {
    let hour12 = this.hour;
    if (hour12 > 12) {
      hour12 -= 12;
    }
    return hour12;
  }

  get hour() {
    return this.now.getHours();
  }

  get trueMinutes() {
    return this.now.getMinutes();
  }

  get minutes() {
    let minutes = this.now.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return minutes;
  }

  get amPm() {
    return this.hour >= 12 ? "PM" : "AM";
  }

  toString() {
    return `${this.hour12}:${this.minutes} ${this.amPm}`;
  }

  addTime({ hours = 0, minutes = 0 }) {
    this.now.setHours(this.hour + hours);
    this.now.setMinutes(this.trueMinutes + minutes);
  }
}
