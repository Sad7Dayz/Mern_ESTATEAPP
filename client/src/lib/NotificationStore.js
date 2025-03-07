import { create } from "zustand"; // Zustand 모듈을 가져옴
import apiRequest from "./apiRequest"; // apiRequest 모듈을 가져옴

// 알림 상태를 관리하는 스토어를 생성
export const useNotificationStore = create((set) => ({
  number: 0, // 알림 수 초기값을 0으로 설정
  fetch: async () => {
    const res = await apiRequest("/users/notification"); // 서버에서 알림 수를 가져옴
    set({ number: res.data }); // 가져온 알림 수를 상태에 설정
  },
  decrease: () => {
    set((prev) => ({ number: prev.number - 1 })); // 알림 수를 1 감소
  },
  reset: () => {
    set({ number: 0 }); // 알림 수를 0으로 초기화
  },
}));
