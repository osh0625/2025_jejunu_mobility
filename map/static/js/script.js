// 전역 변수 선언
let map;  // Google 지도 객체
let marker;  // 지도 위 마커 객체
let infowindow  //정보 창
const locationInfoDiv = document.getElementById('location-info');  // 상태 메시지를 표시할 DOM 요소

/**
 * Google Maps를 초기화하고 기본 설정을 적용하는 함수
 */
function initMap() {
    const defaultLocation = { lat: 37.5665, lng: 126.9780 }; // 서울 시청
    const marker_1 = { lat: 38.5665, lng: 126.9780 };
    const marker_2 = { lat: 38.5665, lng: 126.9780 };
    const marker_3 = { lat: 38.5665, lng: 126.9780 };
    const marker_4 = { lat: 38.5665, lng: 126.9780 };

    // Google 지도 초기화 및 기본 설정
    map = new google.maps.Map(document.getElementById('map'), {
        center: osh,
        zoom: 15,
        zoomControl: true,         // 줌 컨트롤
        mapTypeControl: true,      // 지도 유형 컨트롤
        scaleControl: true,        // 축척 컨트롤
        streetViewControl: true,   // 스트리트뷰 컨트롤
        rotateControl: true,       // 회전 컨트롤
        fullscreenControl: true    // 전체화면 컨트롤
    });

    // 초기 위치에 마커 생성
    marker_1 = new google.maps.Marker({
        position: defaultLocation,
        map: map,
        title: '현재 위치'
    });
    marker_2 = new google.maps.Marker({
        position: osh,
        map: map,
        title: '현재 위치'
    });
    marker_3 = new google.maps.Marker({
        position: osh,
        map: map,
        title: '현재 위치'
    });
    marker_4 = new google.maps.Marker({
        position: osh,
        map: map,
        title: '현재 위치'
    });

    infowindow = new google.maps.InfoWindow({
        content: "마커에 표시할 내용",
        ariaLabel: "마커 정보"
    })

    marker.addListener("click", () => {
        infowindow.open({
            anchor: marker,
            map
        })
    })
}

/**
 * 사용자의 현재 위치를 가져와서 지도에 표시하는 함수
 */
function getCurrentLocation() {
    // 브라우저의 위치 정보 지원 여부 확인
    if (!navigator.geolocation) {
        updateStatus('이 브라우저에서는 위치 정보를 지원하지 않습니다.');
        return;
    }

    updateStatus('위치 정보를 가져오는 중...');
    
    // 위치 정보 요청 옵션 설정
    const options = {
        enableHighAccuracy: true,  // 높은 정확도 사용
        timeout: 5000,            // 타임아웃 5초
        maximumAge: 0             // 캐시된 위치 정보를 사용하지 않음
    };

    // 위치 정보 요청
    navigator.geolocation.getCurrentPosition(
        // 성공 콜백
        (position) => {
            const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            map.setCenter(pos);  // 지도 중심 이동
            marker.setPosition(pos);  // 마커 위치 업데이트
            updateStatus(`위도: ${pos.lat.toFixed(6)}, 경도: ${pos.lng.toFixed(6)}`);
        },
        // 에러 콜백
        (error) => {
            let errorMessage;
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = "위치 정보 접근이 거부되었습니다. 브라우저의 위치 정보 권한을 확인해주세요.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = "위치 정보를 사용할 수 없습니다.";
                    break;
                case error.TIMEOUT:
                    errorMessage = "위치 정보 요청이 시간 초과되었습니다.";
                    break;
                default:
                    errorMessage = "알 수 없는 오류가 발생했습니다.";
            }
            updateStatus(errorMessage);
        },
        options
    );
}

/**
 * 상태 메시지를 화면에 업데이트하는 함수
 * @param {string} message - 표시할 메시지
 */
function updateStatus(message) {
    locationInfoDiv.textContent = message;
}