import React, { Component } from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    View,
    Alert,
    Dimensions,
    ActivityIndicator
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

//Header Component
import Header from '../../components/Header'

import { API, API_KEY } from '../../utils/API'
import Icons from '../../assets/icons'

const { width, height } = Dimensions.get('screen')
const QR_DIMENSSION = width - 50
const REGEX_KEY = /^([0-9]{7,14})$/g

//STATIC REMOVE BEFORE BUILD
const data = {
    "products": [
        {
            "barcode_number": "886736874135",
            "barcode_type": "UPC",
            "barcode_formats": "UPC 886736874135, EAN 0886736874135",
            "mpn": "510642-600",
            "model": "",
            "asin": "B005OBFDTS",
            "product_name": "Nike Free Run Gym Red Platinum Silver Mens Running 510642-600 (9)",
            "title": "",
            "category": "Apparel & Accessories > Shoes",
            "manufacturer": "Nike",
            "brand": "Nike",
            "label": "Nike",
            "author": "",
            "publisher": "Nike",
            "artist": "",
            "actor": "",
            "director": "",
            "studio": "",
            "genre": "9 D(m) Us",
            "audience_rating": "",
            "ingredients": "",
            "nutrition_facts": "",
            "color": "Gym Red/Reflect Silver-Pure Platinum-Volt",
            "format": "",
            "package_quantity": "",
            "size": "9 D(m) Us",
            "length": "10.04",
            "width": "3.94",
            "height": "3.94",
            "weight": "88",
            "release_date": "",
            "description": "Nike Free Run 3 Gym Red Barefoot Mens Running Shoes 510642-600 [US size 9]",
            "features": [
                "Model Number: 510642600",
                "Gender: mens",
                "Color: GYM RD/RFLCT SLVR -PR PLTNM-VLT",
                "Made In: CHINA",
                "Brand New With Original Box"
            ],
            "images": [
                "https://images.barcodelookup.com/5219/52194594-1.jpg",
                "https://images.barcodelookup.com/5219/52194594-2.jpg",
                "https://images.barcodelookup.com/5219/52194594-3.jpg",
                "https://images.barcodelookup.com/5219/52194594-4.jpg",
                "https://images.barcodelookup.com/5219/52194594-5.jpg"
            ],
            "stores": [],
            "reviews": []
        }
    ]
}

export default class ScannerScreen extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: false
        }
    }

    componentDidMount() {
        //STATIC REMOVE BEFORE BUILD
        // this.staticFunc()
        const { navigation } = this.props
        this.willFocus = navigation.addListener('willFocus', () => {
            if (this.scanner) this.scanner.reactivate()
        });
    }
    //STATIC REMOVE BEFORE BUILD
    staticFunc = () => {
        const productDetails = data.products[0]
        this.props.navigation.navigate("ProductDetailsScreen", { product: productDetails })
    }

    componentWillUnmount() {
        if (this.willFocus) this.willFocus = null;
    }

    onSuccess = (barcode) => {
        try {
            if (REGEX_KEY.test(barcode)) {
                this.fetchData(barcode)
            } else {
                Alert.alert(null, "Product not found",
                    [{ text: 'OK', onPress: () => { if (this.scanner) this.scanner.reactivate() } }]
                )
            }
        } catch (error) {
            Alert.alert(null, "Scanning Error:" + error,
                [{ text: 'OK', onPress: () => { if (this.scanner) this.scanner.reactivate() } }]
            )
            console.log('scanning error:', error)
        }
    };

    fetchData = (barcode) => {
        const URL = API.PRODUCTS + '/?barcode=' + barcode + '&key=' + API_KEY
        this.setState({ loading: true })
        fetch(URL, {
            'Accept': 'application/json'
        }).then((response) => {
            console.log('ScannerScreen', 'fetchData-status', response.status)
            return response.json()
        }).then((jsonResponse) => {
            this.setState({ loading: false })
            console.log('ScannerScreen', 'fetchData-jsonResponse', jsonResponse.products[0])
            const { products } = jsonResponse
            if (products && products.length > 0) {
                const productDetails = products[0]
                this.props.navigation.navigate("ProductDetailsScreen", { product: productDetails })
            } else {
                Alert.alert(null, "Product not found",
                    [{ text: 'OK', onPress: () => { if (this.scanner) this.scanner.reactivate() } }]
                )
            }
        }).catch((error) => {
            this.setState({ loading: false })
            console.log('ScannerScreen', 'fetchData-error', error)
        })
    }

    render() {
        const { loading } = this.state
        return (
            <View style={styles.container}>
                <Header
                    hearderText={'SCAN QR CODE'}
                />
                <View style={styles.border} />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <QRCodeScanner
                        ref={(node) => { this.scanner = node }}
                        containerStyle={{ height: QR_DIMENSSION, width: QR_DIMENSSION }}
                        cameraStyle={{ height: QR_DIMENSSION, width: QR_DIMENSSION }}
                        onRead={this.onSuccess}
                    />
                </View>
                {loading &&
                    <View style={[StyleSheet.absoluteFill, { alignItems: 'center', justifyContent: 'center' }]}>
                        <ActivityIndicator animating={loading} size={"large"} />
                    </View>
                }
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    border: {
        width: '100%',
        height: 2,
        backgroundColor: '#1E1C2A'
    },
})