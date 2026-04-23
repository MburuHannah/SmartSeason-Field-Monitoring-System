import requests

BASE_URL = 'http://localhost:8000/api'

def run_tests():
    print("Testing Login...")
    res = requests.post(f"{BASE_URL}/accounts/login/", json={
        "username": "admin",
        "password": "admin123"
    })
    
    if res.status_code != 200:
        print("Login failed!", res.text)
        return
        
    admin_token = res.json()['access']
    headers = {"Authorization": f"Bearer {admin_token}"}
    print("Admin Token acquired")

    print("\nTesting Agent Creation...")
    res = requests.post(f"{BASE_URL}/accounts/users/", json={
        "username": "testagent",
        "password": "password123",
        "full_name": "Test Agent",
        "unit": "Test Unit"
    }, headers=headers)
    
    if res.status_code == 201:
        print("Agent created successfully")
        agent_id = res.json()['id']
    else:
        print("Agent creation failed", res.text)
        return

    print("\nTesting Field Creation...")
    res = requests.post(f"{BASE_URL}/fields/", json={
        "name": "Test Field",
        "cropType": "Test Crop",
        "plantingDate": "2026-04-20",
        "assigned_agent_id": agent_id,
        "location": "North",
        "area": "100"
    }, headers=headers)
    
    if res.status_code == 201:
        print("Field created successfully")
        field_id = res.json()['id']
    else:
        print("Field creation failed", res.text)
        return

    print("\nTesting Agent Login...")
    res = requests.post(f"{BASE_URL}/accounts/login/", json={
        "username": "testagent",
        "password": "password123"
    })
    agent_token = res.json()['access']
    agent_headers = {"Authorization": f"Bearer {agent_token}"}
    print("Agent logged in")

    print("\nTesting Change Password...")
    res = requests.put(f"{BASE_URL}/accounts/change-password/", json={
        "old_password": "password123",
        "new_password": "newpass123"
    }, headers=agent_headers)
    
    if res.status_code == 200:
        print("Password changed successfully")
    else:
        print("Password change failed", res.text)

    print("\nTesting Field Update (Agent)...")
    res = requests.post(f"{BASE_URL}/fields/{field_id}/updates/", json={
        "stage": "Growing",
        "notes": "Looking good"
    }, headers=agent_headers)
    
    if res.status_code == 201:
        print("Field updated successfully")
    else:
        print("Field update failed", res.text)

    print("\nTesting Dashboard (Admin)...")
    res = requests.get(f"{BASE_URL}/dashboard/", headers=headers)
    if res.status_code == 200:
        print("Dashboard stats loaded:", res.json())
    else:
        print("Dashboard loading failed", res.text)
        
    print("\nAll tests completed!")

if __name__ == '__main__':
    run_tests()
