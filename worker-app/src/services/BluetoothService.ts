import {Http} from '@angular/http';
import {BluetoothSerial} from '@ionic-native/bluetooth-serial';
declare var evothings: any;

export class BluetoothService {

    url = 'http://santed.susan.to:8000/siteReport';
    beacons = {};

    static get parameters() {
        return [[Http],[BluetoothSerial]];
    }

    constructor(private http:Http, private bluetoothSerial: BluetoothSerial) { }
    
    startScanBackground() {
        this.scanEddystoneTLM();

        if (!this.bluetoothSerial.isEnabled) {
            this.bluetoothSerial.enable().then(() => {
                this.bluetoothSerial.setDiscoverable(0);
                this.scanNonEddystone();
            });
        } else {
            this.scanNonEddystone();
        }

        // Clear beacons every 30 second
        setInterval(() => {
            this.beacons = {};
        }, 30000);

        // Try to report every second
        setInterval(() => {
            if (Object.keys(this.beacons).length > 0) {
                const payload = {
                    beacons: this.beacons,
                }
                const response = this.http.post(this.url, payload).map(res => res.json());
            }
        }, 1000)

        // Update bluetooth name every second
        setInterval(() => {
            const strippedBeacon = Object.keys(this.beacons).map((key) => { 
                const beacon = this.beacons[key];
                return {
                    address: beacon.address,
                    temperature: beacon.temperature,
                    pressure: beacon.pressure || (beacon.voltage/8),
                    light: beacon.light || (beacon.adv_cnt/100),
                }
            });
            const newName = "x:" + JSON.stringify(strippedBeacon);
            this.bluetoothSerial.setName(newName)
        });
    }

    scanEddystoneTLM() {
        if (typeof evothings !== "undefined") {
            evothings.eddystone.startScan((beacon) => {
                console.log("Beacon detected");
                this.beacons[beacon.address] = {
                    address: beacon.address,
                    temperature: beacon.temperature,
                    original: true,
                    pressure: beacon.pressure || (beacon.voltage/8),
                    light: beacon.light || (beacon.adv_cnt/100),
                };
                console.log(beacon);
            }, (err) => {
                console.log(err);
            });
        }
    }

    scanNonEddystone() {
        // Scan with spesific name
        setInterval(() => {
            this.bluetoothSerial.list().then((data) => {
                data.forEach((d) => {
                    if (d.name && d.name.startsWith("x:")) {
                        const dataInName = JSON.parse(d.name.substr(3));
                        dataInName.data && dataInName.data.forEach((dd) => {
                            if (this.beacons[dd.address] && !this.beacons[dd.address].original) {
                                this.beacons[dd.address] = dd;
                            }
                        });
                    }
                });
            });
        }, 30000);
    }

    sendReport() {

    }


}