import React, { Component } from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    View,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Text
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import Carousel from 'react-native-snap-carousel';
import moment from 'moment'

//Header Component
import Header from '../../components/Header'

import { API } from '../../utils/API'
import Icons from '../../assets/icons'
import icons from '../../assets/icons';

const { width, height } = Dimensions.get('screen')
const QR_DIMENSSION = width - 50

export default class ProductDetailsScreen extends Component {

    constructor(props) {
        super(props)

        let product = null
        const { params, name } = props.route

        if (params) {
            if (params.product) product = params.product
        }

        this.state = {
            product: product,
            activeIndex: 0
        }
    }

    renderDots = () => {
        const { activeIndex } = this.state
        return (
            <View style={{
                position: 'absolute',
                zIndex: 99,
                bottom: 20,
                width: '100%',
                height: 15,
                flexDirection: "row",
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {this.state.product?.images?.map((item, index) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ activeIndex: index })
                            }}
                            style={{
                                marginHorizontal: 2.5,
                                borderRadius: 4,
                                height: 8,
                                width: 8,
                                backgroundColor: activeIndex === index ? '#2072d6' : '#1E1C2A40'
                            }}
                        />
                    )
                })}
            </View>
        )
    }

    renderImage = ({ item, index }) => {
        return (
            <View style={{ alignItems: 'center' }}>
                <Image
                    style={{ resizeMode: 'contain', width: '100%', height: '100%' }}
                    source={{ uri: item }}
                />
            </View>
        );
    }

    render() {
        const { product, activeIndex } = this.state
        return (
            <View style={styles.container}>
                <Header
                    hearderText={'PRODUCT DETAILS'}
                    leftIcon={Icons.backArrow}
                    onLeftAction={() => this.props.navigation.goBack()}
                />
                <View style={{ flex: 1 }}>
                    <ScrollView
                        alwaysBounceVertical={false}
                        alwaysBounceHorizontal={false}
                        bounces={false}
                        overScrollMode={'never'}
                        showsVerticalScrollIndicator={false}
                        style={{ flex: 1, backgroundColor: '#ECE9E9' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', height: width, flex: 1 }}>
                            {product?.images?.length > 1 && this.renderDots()}
                            {product?.images?.length > 0 &&
                                <Carousel
                                    ref={(ref) => { this.carouselRef = ref }}
                                    data={product?.images}
                                    scrollEnabled={product?.images?.length == 1 ? false : true}
                                    sliderWidth={width}
                                    itemWidth={width}
                                    inactiveSlideOpacity={0.0}
                                    inactiveSlideScale={0.7}
                                    firstItem={activeIndex}
                                    enableMomentum={true}
                                    swipeThreshold={5}
                                    renderItem={this.renderImage}
                                    onSnapToItem={(slideIndex) => { this.setState({ activeIndex: slideIndex, }) }}
                                />
                            }
                        </View>
                        <View style={styles.border} />
                        <View style={{ flex: 1, padding: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{product?.product_name.toUpperCase()}</Text>
                            <Text>{"Size: " + product?.size}</Text>
                            <Text>{"\tLength: " + product?.length}</Text>
                            <Text>{"\tWidth: " + product?.width}</Text>
                            <Text>{"\tHeight: " + product?.height}</Text>
                            <Text>{"\tWeight: " + product?.Weight}</Text>
                            <Text>{"Features: \n"}
                                {product.features?.map((item, index) => {
                                    let itemDetail = index == 0 ? ('\t' + item) : ('\n\t' + item)
                                    return itemDetail
                                })}
                            </Text>
                        </View>
                    </ScrollView>
                </View>
            </View >
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
    qrAreaStyle: {
        width: QR_DIMENSSION,
        height: QR_DIMENSSION,
        position: 'absolute'
    },
})