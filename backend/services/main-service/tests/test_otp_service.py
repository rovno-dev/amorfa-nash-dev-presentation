from app.services.otp_service import generate_otp, save_otp, verify_otp


def test_generate_otp_is_six_digits():
    code = generate_otp()
    assert len(code) == 6
    assert code.isdigit()


def test_save_and_verify(_cache):
    save_otp("a@b.c", "123456")
    assert verify_otp("a@b.c", "123456") is True


def test_verify_consumes_code(_cache):
    save_otp("a@b.c", "123456")
    verify_otp("a@b.c", "123456")
    assert verify_otp("a@b.c", "123456") is False


def test_verify_wrong_code(_cache):
    save_otp("a@b.c", "123456")
    assert verify_otp("a@b.c", "000000") is False
