function solution(phone_book) {
  phone_book.sort(); // 사전순으로 정렬

  // 마지막 전화번호는 비교할 전화번호가 없으므로 체크할 필요가 없습니다.
  for (let i = 0; i < phone_book.length - 1; i++) {
    // 전화번호의 바로 앞 전화번호에 접두어로 포함되어 있는지 체크
    // String.startsWith();
    // => 대상 문자열이 주어진 문자로 시작하면 true, 아니면 false
    // 두 번째 매개변수로는 탐색할 index 위치가 들어오고 기본값은 0 입니다.
    if (phone_book[i + 1].startsWith(phone_book[i])) {
      return false;
    }
  }
  return true;
}
