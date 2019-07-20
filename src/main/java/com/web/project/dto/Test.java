package com.web.project.dto;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "my_test")
public class Test implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	private String brand;

	private String model;

	@Column(name = "engine")
	private String typeOfEngine;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Test() {
		// TODO Auto-generated constructor stub
	}

	public Test(int id, String brand, String model, String typeOfEngine) {
		this.id = id;
		this.brand = brand;
		this.model = model;
		this.typeOfEngine = typeOfEngine;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public String getTypeOfEngine() {
		return typeOfEngine;
	}

	public void setTypeOfEngine(String typeOfEngine) {
		this.typeOfEngine = typeOfEngine;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public String toString() {
		return "Test [id=" + id + ", brand=" + brand + ", model=" + model + ", typeOfEngine=" + typeOfEngine + "]";
	}

}
