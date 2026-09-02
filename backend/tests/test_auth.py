import pytest
from unittest.mock import patch
from auth import verify_password, get_password_hash, create_access_token

@patch('auth.pwd_context.hash')
@patch('auth.pwd_context.verify')
def test_password_hashing(mock_verify, mock_hash):
    mock_hash.return_value = "mocked_hash"
    mock_verify.side_effect = lambda p, h: p == "supersecretpassword123"
    
    password = "supersecretpassword123"
    hashed = get_password_hash(password)
    
    assert hashed != password
    assert verify_password(password, hashed) is True
    assert verify_password("wrongpassword", hashed) is False

def test_create_access_token():
    data = {"sub": "user_id_123"}
    token = create_access_token(data)
    
    assert token is not None
    assert isinstance(token, str)
    assert len(token) > 20
