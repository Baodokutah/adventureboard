import { Component } from "react";
import "./navbar.css";


class Navbar extends Component{
state = {clicked: false};
handleClick = () => {
    this.setState({clicked: !this.state.clicked})
}
render(){
return (
    <>
        <nav>
            <a href="home">
            <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75" fill="none">
  <path d="M33.8073 0.115097C33.1988 0.368273 33.1538 0.989703 33.3002 6.3179C33.3679 8.83815 33.3904 9.02227 33.6045 9.28696C33.7735 9.4941 33.9989 9.59767 34.3594 9.6322C34.8214 9.68974 34.9229 9.65521 35.2609 9.3445L35.644 8.99926V7.08893C35.644 6.04171 35.6665 5.17861 35.7004 5.17861C35.7342 5.17861 36.4666 6.08774 37.3342 7.20401C39.092 9.47108 39.3963 9.7818 39.8808 9.7818C40.2977 9.7818 40.8386 9.50561 40.9964 9.21791C41.1428 8.93021 41.1541 1.04724 40.9964 0.644464C40.8837 0.333749 40.3653 1.71661e-05 39.9935 1.71661e-05C39.6104 1.71661e-05 39.1822 0.264701 39.0132 0.586925C38.8892 0.828592 38.8554 1.4155 38.8554 2.99209C38.8554 4.18892 38.8103 5.06353 38.754 5.06353C38.6413 5.06353 37.1089 3.11868 35.8356 1.35796C35.3961 0.748036 34.9341 0.184145 34.8102 0.126605C34.5397 -0.0229988 34.1566 -0.0229988 33.8073 0.115097Z" fill="black"/>
  <path d="M29.6156 0.37978C29.5818 0.402796 29.255 0.460336 28.8831 0.49486C27.8803 0.586924 25.4351 1.03573 25.1985 1.16232C24.7928 1.39248 24.6351 1.78375 24.7139 2.43971C24.7477 2.77344 24.8041 3.13019 24.8266 3.22225C24.8492 3.31431 24.9055 3.64805 24.9393 3.97027C25.052 4.81035 25.0633 4.91392 25.4351 7.36512C25.8069 9.73577 25.9309 10.081 26.4943 10.2881C26.7084 10.3687 27.407 10.3227 28.793 10.1385C31.3847 9.80481 31.2832 9.82783 31.6551 9.43656C32.1283 8.95322 32.1171 8.30878 31.6213 7.88298C31.2269 7.53774 31.1368 7.53774 28.962 7.82544C28.3873 7.906 27.8915 7.95203 27.869 7.91751C27.8352 7.89449 27.8014 7.58377 27.7901 7.25004L27.7563 6.62861L28.8606 6.44448C30.3818 6.1798 30.8663 5.67345 30.4607 4.78734C30.1452 4.10836 29.548 4.02781 27.6775 4.4421C27.3957 4.51114 27.3732 4.47662 27.2493 3.8667C27.1817 3.50995 27.1479 3.17622 27.1817 3.11868C27.2155 3.06114 27.5422 2.98058 27.8915 2.93455C28.2521 2.90003 28.7254 2.81947 28.9395 2.76193C29.1536 2.70439 29.548 2.63534 29.8071 2.60082C30.4719 2.52026 30.9114 2.25558 31.0691 1.86431C31.3396 1.19685 30.8889 0.483352 30.1001 0.37978C29.8635 0.345256 29.6494 0.345256 29.6156 0.37978Z" fill="black"/>
  <path d="M43.5091 0.690514C43.0584 0.966704 42.9231 1.5306 43.1823 2.04846C43.4189 2.52028 43.6443 2.63536 44.7148 2.78497C45.3571 2.88854 45.6162 2.96909 45.6162 3.08417C45.6162 3.17624 45.4697 4.03934 45.2782 4.9945C44.3767 9.72428 44.3993 9.50563 44.6584 10.0005C45.019 10.714 46.0106 10.737 46.4726 10.0465C46.7092 9.68975 47.036 8.19372 47.5318 5.17863C47.8135 3.4064 47.8022 3.42941 48.3093 3.52148C48.5347 3.56751 48.8276 3.64806 48.9741 3.6941C49.1206 3.75164 49.5037 3.79767 49.8418 3.79767C50.3714 3.79767 50.4728 3.76314 50.7319 3.44092C51.1151 2.9806 51.1151 2.43973 50.7545 2.03695C50.608 1.87584 50.3601 1.70322 50.2136 1.6802C47.1487 0.978212 44.5232 0.460354 44.0274 0.460354C43.9373 0.460354 43.7119 0.563926 43.5091 0.690514Z" fill="black"/>
  <path d="M21.2884 2.10596C20.7926 2.35913 20.6123 2.76191 20.5447 3.74009C20.4997 4.24644 20.4546 4.78732 20.432 4.93692C20.4095 5.08652 20.3532 5.70796 20.3194 6.31788C20.1841 8.45836 20.1616 8.58495 19.8799 8.27423C19.801 8.18217 18.9672 7.25002 18.0207 6.17978C17.0742 5.12105 16.1952 4.20041 16.0713 4.13136C15.7558 3.95874 15.1022 4.10835 14.7867 4.43057C14.3585 4.86787 14.4149 5.4893 14.9445 6.14526C15.891 7.33058 19.7898 11.7266 20.1503 12.0143C20.4659 12.2675 20.6236 12.325 20.9278 12.2675C21.3898 12.1985 21.7955 11.8302 21.942 11.3469C22.0885 10.8635 22.3702 8.74606 22.573 6.44447C22.6068 6.03018 22.6631 5.51232 22.6857 5.29367C22.9448 2.91152 22.8772 2.4512 22.2349 2.14048C21.7842 1.92183 21.649 1.91032 21.2884 2.10596Z" fill="black"/>
  <path d="M53.1997 2.93457C52.7602 3.24529 50.9122 8.11316 50.901 9.0223C50.8446 11.3124 52.7039 13.1537 54.8786 12.9695C56.3322 12.8429 57.3576 12.141 58.0337 10.783C60.1183 6.61713 60.3436 5.90363 59.769 5.31673C59.4084 4.93696 58.721 4.90244 58.3492 5.23617C58.2252 5.35125 57.6506 6.38697 57.0872 7.52626C55.9265 9.90841 55.6561 10.3112 55.1152 10.5529C54.3377 10.8751 53.4138 10.2306 53.3123 9.29849C53.2673 8.8842 53.3799 8.4584 54.0786 6.61713C55.0364 4.06236 55.1152 3.49846 54.5969 3.03815C54.2251 2.71592 53.5715 2.66989 53.1997 2.93457Z" fill="black"/>
  <path d="M10.0203 6.84723C9.68224 6.92779 8.98362 7.21549 8.46529 7.49168C6.67366 8.41232 6.24547 8.88414 6.51591 9.64367C6.58352 9.85081 7.13565 10.8865 7.72159 11.9453C8.3188 13.004 9.02869 14.2814 9.31039 14.7877C10.3358 16.6635 10.6738 17.0088 11.395 16.8707C11.9133 16.7671 13.5585 15.7889 14.2007 15.202C15.2938 14.2008 15.8572 12.958 15.8797 11.5425C15.9022 10.127 15.4177 8.97621 14.4036 8.00954C13.6937 7.33057 12.8824 6.9508 11.8683 6.78969C10.8992 6.6516 10.7865 6.6516 10.0203 6.84723ZM11.9809 9.36748C12.6232 9.66669 13.3556 10.4262 13.4458 10.898C13.4909 11.0822 13.5359 11.3238 13.5585 11.4504C13.6486 11.8647 13.3669 12.6357 12.9725 13.1191C12.6458 13.4988 11.8795 14.0397 11.6542 14.0397C11.5865 14.0397 9.31039 9.94288 9.31039 9.81629C9.29913 9.63216 10.5273 9.1028 10.9668 9.1028C11.2147 9.09129 11.6767 9.21788 11.9809 9.36748Z" fill="black"/>
  <path d="M62.6198 7.45718C62.462 7.59528 61.9099 8.36631 61.4028 9.19489C60.8958 10.0235 59.9718 11.4504 59.352 12.3826C58.7323 13.3032 58.2027 14.2009 58.1689 14.385C58.0111 15.1445 58.8901 15.9155 59.6112 15.6624C59.9943 15.5243 60.231 15.2596 60.7831 14.3505C60.9972 13.9937 61.2226 13.6945 61.2789 13.6945C61.324 13.6945 61.5268 13.8786 61.7183 14.0973L62.0677 14.5116V16.0651C62.0677 17.8144 62.1578 18.079 62.8001 18.2977C63.2621 18.4588 63.8931 18.2286 64.1072 17.8144C64.1861 17.6763 64.2762 16.9973 64.2987 16.3068L64.3551 15.0755H64.7044C65.1777 15.0755 66.1016 14.6151 66.5636 14.1433C67.1158 13.5794 67.3862 12.8659 67.3862 11.9453C67.3862 10.3572 66.8566 9.51711 64.9748 8.14766C63.6903 7.21551 63.1381 7.0544 62.6198 7.45718ZM64.4227 10.6794C65.1889 11.2663 65.2903 12.256 64.6255 12.6703C64.017 13.0501 63.4536 12.912 62.8114 12.2215L62.4958 11.8647L62.9128 11.1397C63.6001 9.97743 63.5325 10.0004 64.4227 10.6794Z" fill="black"/>
  <path d="M0.419916 12.9119C-0.13222 13.3607 -0.13222 13.844 0.374844 15.881C0.588938 16.7326 1.01713 18.5163 1.33263 19.8397C1.64814 21.1631 1.95238 22.3369 2.01999 22.452C2.35803 23.0965 3.4623 23.0389 4.01444 22.3484C4.19473 22.1068 4.18346 21.5889 3.98063 20.8984C3.89049 20.5992 3.84542 20.3 3.86795 20.2425C3.92429 20.1619 6.00889 18.5968 6.38074 18.3667C6.45961 18.3207 6.77512 18.4357 7.14697 18.6544C8.01461 19.1607 8.54421 19.1607 9.01747 18.6659C9.32171 18.3667 9.37805 18.2171 9.37805 17.8143C9.35551 17.1699 9.09635 16.9512 6.95541 15.7659C5.99762 15.248 4.42009 14.3734 3.4285 13.8325C1.56926 12.8083 0.825568 12.5782 0.419916 12.9119ZM4.4877 17.1583C4.4877 17.2734 3.47357 18.0214 3.37216 17.9754C3.29328 17.9294 2.91016 16.606 2.91016 16.3643C2.91016 16.2607 3.19187 16.3643 3.69893 16.6405C4.13839 16.8706 4.4877 17.1008 4.4877 17.1583Z" fill="black"/>
  <path d="M70.6878 12.8774C70.5526 12.935 69.9779 13.5104 69.3919 14.1663C68.806 14.8223 67.9384 15.7775 67.4651 16.2838C65.234 18.689 65.234 18.689 65.3354 19.1723C65.4143 19.5175 65.7298 19.9088 66.8792 21.0826C67.6679 21.8882 68.4792 22.6362 68.6821 22.7283C69.1891 22.9815 69.7638 22.8549 70.1244 22.4176C70.654 21.7731 70.4849 21.3818 69.0426 19.9779L67.9947 18.9537L68.4342 18.5739L68.8736 18.1941L69.7525 19.0572C70.5751 19.8628 70.654 19.9088 71.1385 19.9088C71.8033 19.9088 72.209 19.5406 72.209 18.9306C72.209 18.5624 72.0963 18.3898 71.2963 17.5382L70.3948 16.5715L70.7667 16.1227L71.1385 15.6624L71.4765 15.9731C71.6681 16.1457 72.1752 16.6406 72.6259 17.0663C73.3696 17.7798 73.4597 17.8374 73.9217 17.8374C74.5077 17.8374 74.8682 17.5267 74.9809 16.9513C75.0823 16.4334 74.8232 16.0652 73.1442 14.3505C71.9498 13.1421 71.623 12.8774 71.3075 12.8314C71.0934 12.7969 70.8117 12.8199 70.6878 12.8774Z" fill="black"/>
  <path d="M35.4299 14.9143C35.1594 15.202 35.1369 15.2941 35.1369 16.2838C35.1369 17.1814 35.1707 17.3886 35.3623 17.6417C35.6665 18.033 36.2412 18.1481 36.6919 17.9064C37.1877 17.6417 37.2778 17.4001 37.2778 16.2838C37.2778 15.3401 37.2666 15.2711 36.9511 14.9489C36.5003 14.5001 35.8581 14.477 35.4299 14.9143Z" fill="black"/>
  <path d="M23.4632 18.5164C22.9786 18.8156 22.8209 19.3219 23.0237 19.8973C23.2378 20.5303 23.5082 21.0366 23.7674 21.3013C24.004 21.543 24.6463 21.6005 25.0069 21.4049C25.2548 21.2553 25.559 20.7029 25.559 20.3692C25.559 20.0584 24.9731 18.8731 24.7027 18.6314C24.3533 18.3092 23.8576 18.2632 23.4632 18.5164Z" fill="black"/>
  <path d="M48.2531 18.4127C47.7685 18.6084 47.0812 19.8397 47.0812 20.4957C47.0812 20.6683 47.2164 20.9675 47.3741 21.1632C47.622 21.4624 47.746 21.5199 48.1742 21.5199C48.6136 21.5199 48.7376 21.4624 49.0418 21.1286C49.5264 20.6108 49.8081 19.7131 49.6616 19.1723C49.4925 18.5623 48.7939 18.1826 48.2531 18.4127Z" fill="black"/>
  <path d="M17.322 22.4291C16.9389 22.8319 16.8939 23.3612 17.1981 23.8446C17.4573 24.2473 18.4601 25.0529 18.8207 25.145C19.2376 25.2485 19.8799 24.9378 20.0827 24.5235C20.3757 23.9712 20.3081 23.6835 19.7898 23.1656C18.6291 22.0378 17.9192 21.8307 17.322 22.4291Z" fill="black"/>
  <path d="M53.256 22.6822C52.4222 23.3152 52.1743 23.787 52.3658 24.3164C52.794 25.4557 53.9884 25.3406 55.1265 24.0517C55.5209 23.6029 55.5547 23.5223 55.4983 23.085C55.4195 22.4751 55.0025 22.0953 54.4279 22.0953C54.1011 22.1068 53.8419 22.2334 53.256 22.6822Z" fill="black"/>
  <path d="M33.9425 23.4188C33.0185 23.9136 30.562 25.2255 28.4887 26.3533C26.4154 27.4696 23.0913 29.2533 21.1081 30.289C16.2628 32.8438 16.1276 32.9244 15.9699 33.4767C15.8008 34.0406 15.9022 34.4204 16.2966 34.8232C16.4656 34.9843 18.2009 35.9625 20.1503 36.9867C23.4744 38.7359 30.7987 42.6601 33.841 44.3288C34.5847 44.743 35.4411 45.1688 35.7341 45.2839L36.275 45.4911L37.2553 44.9847C37.7961 44.7085 39.4526 43.7994 40.9399 42.9708C47.2501 39.4494 50.3263 37.7462 50.608 37.6426C50.9798 37.493 50.9911 37.3434 50.6418 36.814C50.1009 35.997 50.315 36.02 43.1936 36.02C39.0469 36.02 36.6468 35.974 36.3426 35.8934C35.3059 35.6287 34.4721 34.6966 34.4608 33.822C34.4608 32.2684 36.0271 31.4283 37.2553 32.3259C37.5708 32.5561 38.0666 33.3847 38.0666 33.6954C38.0666 33.7874 39.6328 33.8335 44.0725 33.8565L50.0671 33.891L50.6981 34.1902C51.5207 34.5815 52.1855 35.2029 52.4785 35.8474C52.6926 36.3192 52.7151 36.5609 52.7151 38.9315V41.5093L52.4334 41.6359C51.8362 41.9121 51.7573 42.3034 51.7573 44.8811C51.7573 46.1815 51.7911 47.3784 51.8475 47.551C51.9489 47.9538 52.5348 48.6327 52.9517 48.8629C53.7743 49.2887 55.0025 48.8859 55.5096 48.0113L55.8138 47.4704V45.0538C55.8138 42.4299 55.7688 42.1883 55.1377 41.6819L54.856 41.4518V38.4482C54.856 35.6748 54.8673 35.4331 55.0589 35.3756C55.6223 35.2029 56.242 34.7886 56.3998 34.4894C56.6139 34.0521 56.5237 33.4307 56.1969 33.0624C56.0505 32.9128 54.3377 31.9577 52.3883 30.945C50.4277 29.9208 47.836 28.5513 46.6303 27.9069C45.4246 27.2624 43.1936 26.0656 41.6724 25.26C40.1512 24.443 38.7314 23.6834 38.5173 23.5569C37.3567 22.8894 36.7257 22.6247 36.1961 22.5787C35.6665 22.5326 35.52 22.5902 33.9425 23.4188Z" fill="black"/>
  <path d="M5.92996 38.3791C5.33275 38.7128 5.28768 39.7946 5.86235 40.2779C6.09898 40.485 6.32435 40.4965 8.91601 40.5081H11.7218L12.0485 40.1743C12.488 39.714 12.5105 38.92 12.0936 38.4942L11.8232 38.2065H9.02869C6.80887 38.218 6.17786 38.2525 5.92996 38.3791Z" fill="black"/>
  <path d="M60.5802 38.5517C60.276 38.874 60.2422 38.966 60.2985 39.4378C60.3323 39.7601 60.445 40.0593 60.5915 40.2089C60.8281 40.439 60.9521 40.4505 63.5776 40.4851L66.3157 40.5196L66.6537 40.2319C67.0481 39.8982 67.1608 39.4954 67.0143 38.9545C66.8228 38.241 66.665 38.2065 63.6452 38.2065H60.9183L60.5802 38.5517Z" fill="black"/>
  <path d="M46.1796 42.3839C45.4697 42.7866 43.926 43.6497 42.7429 44.3057C41.571 44.9617 40.0498 45.8132 39.3624 46.2045C38.6864 46.6073 37.706 47.1367 37.199 47.4013L36.275 47.8732L35.7567 47.643C35.1594 47.3783 30.1339 44.674 27.0915 42.9708C25.9196 42.3148 24.8491 41.7739 24.7027 41.7739C24.2181 41.7739 24.1843 42.0501 24.2294 45.3759C24.2745 48.8629 24.2857 48.9549 25.1646 50.1863C25.7281 50.9688 26.2238 51.3026 29.6719 53.2589C34.4383 55.9518 34.9228 56.1819 35.9257 56.251C37.0299 56.3085 37.7398 56.0438 40.2075 54.6169C41.2329 54.0299 42.6978 53.1899 43.4753 52.7641C46.4163 51.1299 47.498 50.2093 48.0051 48.9319C48.253 48.3105 48.2642 48.1033 48.298 45.1688C48.3318 42.1077 48.3318 42.0616 48.0839 41.8545C47.9487 41.7509 47.7572 41.6589 47.6558 41.6589C47.5543 41.6589 46.8895 41.9811 46.1796 42.3839ZM46.0557 47.0791C46.4839 47.8617 45.8191 48.7823 44.2077 49.6569C43.6556 49.9561 41.8978 50.9573 40.3202 51.878C38.7427 52.7986 37.244 53.6617 37.0074 53.7768C36.2074 54.168 35.7679 54.0415 33.3791 52.6835C28.5563 49.9446 27.5197 49.3347 27.1816 49.07C26.6971 48.7018 26.3027 47.8617 26.4041 47.4244C26.5281 46.8144 26.7196 46.7684 27.4183 47.1712C27.9704 47.4934 29.6381 48.4141 34.2918 50.9458C35.0355 51.3601 35.8243 51.7168 36.0496 51.7514C36.4102 51.8089 36.8497 51.5903 40.3315 49.6224C46.2022 46.3081 45.7402 46.5152 46.0557 47.0791Z" fill="black"/>
  <path d="M6.85399 60.7391C6.68497 60.8196 6.49341 61.0152 6.41454 61.1764C6.32439 61.372 6.29059 63.0291 6.29059 66.6311V71.7867L6.58356 72.155L6.87653 72.5117L9.24283 72.5002C11.8007 72.4772 12.3979 72.3851 13.2092 71.8443C14.1557 71.2113 14.7417 70.2216 14.7417 69.2089C14.7417 68.4379 14.2346 67.3907 13.6261 66.9303L13.1867 66.6081L13.5923 66.2399C15.3727 64.6403 14.3811 61.3605 11.9246 60.7736C11.1246 60.5779 7.22584 60.5549 6.85399 60.7391ZM11.35 63.3514C11.9584 63.6621 12.0824 64.6288 11.5641 65.0891C11.395 65.2502 11.0795 65.3307 10.3584 65.3768C8.82591 65.4919 8.88225 65.5379 8.88225 64.2605V63.1787H9.95272C10.6739 63.1787 11.1359 63.2363 11.35 63.3514ZM11.5641 68.1157C12.0937 68.4034 12.1838 69.0823 11.7669 69.5887C11.5077 69.8879 11.4288 69.9109 10.4711 69.9569C9.89638 69.9685 9.31044 69.9569 9.16395 69.9224C8.89352 69.8534 8.88225 69.8189 8.88225 68.8752V67.9085L9.76116 67.874C10.6964 67.8395 11.1697 67.897 11.5641 68.1157Z" fill="black"/>
  <path d="M57.0872 60.9808L56.7153 61.3145V66.6312V71.9479L57.0308 72.2241C57.3351 72.4888 57.4027 72.5003 59.2394 72.5003C61.8987 72.5003 63.0818 72.1781 64.3776 71.0848C66.158 69.5773 66.9242 67.3793 66.4059 65.3078C66.1129 64.1455 65.696 63.409 64.8284 62.5344C63.3748 61.0614 62.2818 60.6816 59.3971 60.6586L57.459 60.6356L57.0872 60.9808ZM61.7409 63.5586C62.9128 64.088 63.8368 65.2848 63.9494 66.4586C64.0734 67.6439 63.1381 69.0249 61.8198 69.6233C61.493 69.7614 61.0085 69.8535 60.3211 69.8765L59.307 69.911L59.2732 66.5852L59.2507 63.2594L60.2873 63.3284C60.862 63.3515 61.5155 63.4665 61.7409 63.5586Z" fill="black"/>
  <path d="M21.9533 62.5689C19.5306 63.0062 17.7728 64.8014 17.2545 67.3907C17.0742 68.2538 17.0742 68.3804 17.2545 69.2665C17.4911 70.5324 17.863 71.2804 18.7306 72.2356C19.9025 73.5245 21.0856 74.0539 22.7984 74.0308C24.9506 74.0193 26.8774 72.8225 27.8014 70.9467C28.2296 70.0836 28.2634 69.957 28.3423 68.7026C28.5564 65.4229 26.0887 62.5344 23.0575 62.5229C22.6068 62.5114 22.111 62.5344 21.9533 62.5689ZM23.5421 65.3193C24.714 65.676 25.5478 66.5737 25.7732 67.7014C25.9309 68.461 25.8633 68.9443 25.5027 69.7038C24.59 71.6027 22.2012 72.0515 20.7701 70.59C20.218 70.0261 19.8123 69.0824 19.8123 68.3689C19.8123 67.6669 20.1504 66.7808 20.6349 66.2169C21.1194 65.653 21.4913 65.4229 22.1448 65.2618C22.7646 65.1122 22.866 65.1122 23.5421 65.3193Z" fill="black"/>
  <path d="M45.5487 62.8221C44.9402 63.0983 44.9402 63.0637 44.9402 68.3919C44.9402 73.8697 44.9515 73.9273 45.6501 74.261C46.2586 74.5602 46.5966 74.5142 47.0361 74.0654L47.4192 73.6741V72.2241V70.7741H48.3206H49.2108L49.6502 71.43C49.8869 71.7983 50.2813 72.4312 50.5179 72.8455C51.1602 73.9733 51.5433 74.3416 52.0504 74.3416C52.6476 74.3416 53.0081 74.1459 53.2222 73.7086C53.5377 73.0066 53.4476 72.7189 52.2306 70.682L51.6672 69.7269L51.9377 69.5312C52.3546 69.232 52.8166 68.6911 53.087 68.1848C53.2898 67.805 53.3349 67.5403 53.3349 66.5737C53.3349 65.5725 53.3011 65.3538 53.0532 64.859C52.6926 64.1455 51.7799 63.2939 51.07 63.0177C50.608 62.8336 50.146 62.7876 48.1516 62.7645C46.8558 62.7415 45.6726 62.7645 45.5487 62.8221ZM49.9883 65.5265C50.5179 65.8026 50.7207 66.1249 50.7207 66.7003C50.7207 67.2642 50.4616 67.7475 49.9996 67.9777C49.8418 68.0697 49.2671 68.1273 48.5798 68.1273H47.4192V66.7463V65.3653H48.546C49.3009 65.3653 49.7855 65.4229 49.9883 65.5265Z" fill="black"/>
  <path d="M35.8242 63.3975C35.2721 63.5471 34.8665 64.1915 33.9312 66.309C31.1367 72.7074 30.8099 73.49 30.8437 73.8237C30.9114 74.8364 32.0494 75.2967 32.7931 74.6062C32.9171 74.4912 33.2213 73.9963 33.4579 73.5015L33.8974 72.6154H36.2524H38.6075L38.9455 73.3404C39.5991 74.7673 40.3089 75.2622 41.1315 74.8709C41.9316 74.4796 42.033 73.8697 41.4921 72.7304C41.2667 72.2586 40.7146 71.0157 40.2639 69.9685C38.6751 66.3205 37.6159 64.0534 37.368 63.7887C37.2328 63.6391 36.9398 63.478 36.7257 63.409C36.275 63.2824 36.2186 63.2824 35.8242 63.3975ZM36.8834 68.8177C37.2215 69.5082 37.5032 70.1296 37.5032 70.1987C37.5032 70.2677 37.0299 70.3138 36.2637 70.3138C35.5876 70.3138 35.0242 70.2792 35.0242 70.2447C35.0242 70.1411 36.1736 67.5518 36.2186 67.5518C36.2412 67.5518 36.5454 68.1157 36.8834 68.8177Z" fill="black"/>
</svg>
            </a>


            <div>
                <ul id="navbar" className={this.state.clicked ? "#navbar active" : "#navbar"}>
                    <li><a href="home">Trang chủ</a></li>
                    <li><a href="ctxh">CTXH</a></li>
                    <li><a href="study">Nhóm môn học</a></li>
                    <li><a href="flag"><span className="login">Đăng nhập</span></a></li>
                </ul>
            </div>


            <div className="mobile" onClick={this.handleClick}>
            <i id="bar" className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
        </nav>
    </>
);
}
}


export default Navbar;