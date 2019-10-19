# 하베스타(harvesta)

팀원들이 만든 코드를 조합하여 뉴스 html 파일들을  저장하는 통합 크롤러. 저장 경로는 팀원들과의 회의를 통해 결정된 구조화된  방식을 따른다.

## 실행 방법

모든 소스를 다운 받고 `harvesta.py`를 실행시키면 된다. 단 `config.py`는 개인 키 정보가 기록되어 있어 목록에 빠져으므로 `config.py.sample` 파일을 참조하여 각 개발자 센터에서 키를 발급받아 작성하면 된다.

***modules/config.py***

```python
#config.py

#--------------------------------------------------------------------------------
# NAVER Developpers
#   https://developers.naver.com
#--------------------------------------------------------------------------------
clientID = "ooOooOOOOOOOOoooooOoO"
clientSecret = "oOoOoooOoooO"


#--------------------------------------------------------------------------------
# These tokens are needed for user authentication.
# Credentials can be generated via Twitter's Application Management:
#	https://developer.twitter.com/en/apps
#--------------------------------------------------------------------------------
consumer_key = "oOooOoOoOoOoooooOOoooOooOo"
consumer_secret = "oooooOOOooOooOooOooooOooooOoooooooOOoOOOoooOoOOOOO"
access_key = "ooOoOooooOOOOOooOOooOOOOOOooOoOoOoOoOOoOOOOoOOOOoO"
access_secret = "ooOOooOOoooOooOoOoooOooOooooOooOooOooOooOooOoO"

```

## 소스 구성

- `harvesta.py` : 메인 코드
- `modules/__init__.py`
- ```modules/daumfuncs.py``` : 희수씨가 작성한 DAUM 크롤러를 모듈화
- `modules/naverfuncs.py` : NAVER 크롤링 관련 모듈
- `moduels/googlefuncs.py` : Google 크롤링 관련 모듈(이걸 쓰면 구글이 블락하여 다른 방법을 사용하여야 할 듯)
- `modules/twitterfuncs.py` : 트위터 크롤링 관련 모듈
- `config.py.sample` : 각종 키 설정 샘플 파일
- `requirements.txt` : 설치해야할 패키지 목록
- 기타
  - google_block.html : 구글에서 블럭 먹은 기념
  - output.csv : 뉴스 수집 후 확인용 output 샘플 파일
  - output_tw.csv : 트위터 수집 후 확인용 output 샘플 파일

## 참조 목록

- https://pandas.pydata.org/
- https://github.com/ideoforms/python-twitter-examples
- https://developers.naver.com/docs/search/news/

