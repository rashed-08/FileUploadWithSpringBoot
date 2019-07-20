package com.web.project.dto;

import org.springframework.web.multipart.MultipartFile;

public class Upload {

	private String name;
	private String email;
	private String phone;
	private MultipartFile file;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public MultipartFile getFile() {
		return file;
	}

	public void setFile(MultipartFile file) {
		this.file = file;
	}

	public Upload() {
		// TODO Auto-generated constructor stub
	}

	public Upload(String name, String email, String phone, MultipartFile file) {
		super();
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.file = file;
	}

}
